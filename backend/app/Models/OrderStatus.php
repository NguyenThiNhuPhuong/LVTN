<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderStatus extends Model
{
    use HasFactory;
    protected $table="order_status";
    protected $fillable = [
        'name',
        'description',
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
