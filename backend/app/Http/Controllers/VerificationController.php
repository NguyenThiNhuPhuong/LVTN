<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class VerificationController extends Controller
{
    public function verifyEmail(Request $request)
    {
        $token = $request->token;

        if (!$token) {
            return view('verificationError');
        }

        $user = User::where('email_verification_token', $token)->first();


        if (!$user) {
            return view('verificationError');
        }
        if (empty($user->email_verified_at)) {
            $user->email_verified_at = now();
            $user->save();
        }


        // Xử lý xác thực thành công
        return view('verificationSuccess');
    }
}
