<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserRequest;
use App\Repositories\UserRepository;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserController extends Controller
{
    protected $userRepository;
    protected $userService;

    public function __construct()
    {
        $this->userRepository = new UserRepository;
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
        $user = $this->userService->updateUser($id,$dataUser)->toArray();
        $userRepari = $this->userService->repariDataUser($user);
        return response()->json([
            'user' => $userRepari
        ]);
    }
    public function changePassword(UserRequest $request, string $id)
    {
        $dataUser = $this->userService->repariDataRequest($request, 'update');
        $user = $this->userService->updateUser($id,$dataUser)->toArray();
        $userRepari = $this->userService->repariDataUser($user);
        return response()->json([
            'user' => $userRepari
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
