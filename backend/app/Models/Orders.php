<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    use HasFactory;
    protected $table="orders";
    protected $fillable = [
        'code',
        'user_id',
        'date',
        'name',
        'phone',
        'email',
        'price_product',
        'price_ship',
        'price_all',
        'discount_id',
        'province_id',
        'district_id',
        'ward_id',
        'address',
        'note',
        'order_status_id',
        'updated_by',
        'created_by'
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
