<?php

namespace App\Http\Controllers;

use App\Http\Requests\ChangePasswordRequest;
use App\Http\Requests\UserRequest;
use App\Mail\EmailVerification;
use App\Mail\ForgetPassword;
use App\Models\PasswordResetTokens;
use App\Models\User;
use App\Repositories\PasswordResetTokensRepository;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Str;

class UserController extends Controller
{
    protected $userRepository;
    protected $userService;

    public function __construct()
    {
        $this->userRepository = new UserRepository;
        $this->passwordResetTokenRepository = new PasswordResetTokensRepository;
        $this->userService = new UserService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = $this->userRepository->getAllUser();
        $result = $this->userService->repariListDataUser($users);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(UserRequest $request)
    {
        $dataUser = $this->userService->repariDataRequest($request, 'add');
        $user = $this->userService->createUser($dataUser)->toArray();
        $userRepari = $this->userService->repariDataUser($user);
        return response()->json([
            'user' => $userRepari
        ]);

    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = $this->userRepository->getUser($id);
        $result = $this->userService->repariDataUser($user);
        return response()->json([
            'user' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UserRequest $request, string $id)
    {
        $dataUser = $this->userService->repariDataRequest($request, 'update');
        $user = $this->userService->updateUser($id, $dataUser)->toArray();
        $userRepari = $this->userService->repariDataUser($user);
        return response()->json([
            'user' => $userRepari
        ]);
    }

    public function changePassword(ChangePasswordRequest $request)
    {
        $result = $this->userService->changePassword($request);
        return response()->json([
            'message' => $result['message']
        ], $result['status']);
    }

    public function reset(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code'=> 'required|string',
            'password' => 'required|string|min:6',
            'confirmPassword' => 'required|string|same:password|min:6',
        ]);
        $reset = $this->passwordResetTokenRepository->getTokenReset($request->email,$request->code);
        if(!$reset){
            return response()->json(['message' => 'An error occurred, please try again.'], 500);
        }
        $user = $this->userRepository->getUserByEmail($request->email);

        $data = [
            'password' => Hash::make($request->password),
        ];

        $newPass = $this->userRepository->updateUser($user->id, $data);
        if ($newPass) {
            $this->passwordResetTokenRepository->deleteToken($request->email);
            return response()->json(['message' => 'Password reset successful.'], 200);
        } else {
            return response()->json(['message' => 'An error occurred, please try again.'], 500);
        }
    }

    public function sendEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $user = $this->userRepository->getUserByEmail($request->email);

        if(!$user){
            return response()->json(['message' => 'Email is not registered account.'],500);
        }
        $code = mt_rand(100000, 999999);
        $expiresAt = Carbon::now()->addMinutes(10); // Thời gian hiệu lực là 10 phút

        $dataToken = [
            'email' => $request->email,
            'token' => $code,
            'created_at' => $expiresAt
        ];

        $this->passwordResetTokenRepository->deleteToken($request->email);

        $this->passwordResetTokenRepository->insertToken($dataToken);

        Mail::to($request->email)->send(new ForgetPassword($code));

        return response()->json(['message' => 'Verification code has been sent to your email.'],200);

    }

    public function confirm(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'code' => 'required'
        ]);

        $reset = $this->passwordResetTokenRepository->getToken($request->email,$request->code);


        if (!$reset) {
            return response()->json(['message' => 'Invalid authentication code.'], 500);
        }

        return response()->json(['message' => 'successful'], 200);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
