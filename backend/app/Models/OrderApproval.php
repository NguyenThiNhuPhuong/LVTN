<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class OrderApproval extends Model
{

    use HasFactory,SoftDeletes;
    protected $table="order_approval";
    protected $fillable = [
        'order_id',
        'user_id',
        'order_status_id',
        'comment',
        'action_time',
    ];
    protected $hidden = [
        'deleted_at'
    ];
}
