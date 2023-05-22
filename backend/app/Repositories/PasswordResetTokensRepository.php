<?php

namespace App\Repositories;

use App\Models\Categories;
use App\Models\PasswordResetTokens;
use Carbon\Carbon;

class PasswordResetTokensRepository
{

    protected $modelClass = PasswordResetTokens::class;
    protected $perPage = 12;

    public function insertToken(array $dataToken)
    {
        return $this->modelClass::insert($dataToken);
    }

    public function getToken($email,$code)
    {
        return $this->modelClass::where('email', $email)
        ->where('token', $code)
        ->where('created_at', '>=', Carbon::now()->subMinutes(10))
        ->first();
    }
    public function getTokenReset($email,$code)
    {
        return $this->modelClass::where('email', $email)
            ->where('token', $code)
            ->first();
    }
    public function deleteToken( $email)
    {
        return $this->modelClass::where('email', $email)
            ->delete();
    }




}
