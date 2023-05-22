<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class PasswordResetTokens extends Model
{
    use HasFactory;
    protected $table="password_reset_tokens";
    protected $guarded = [];
    protected $hidden = [
        'email',
        'token',
        'created_at'
    ];
}
