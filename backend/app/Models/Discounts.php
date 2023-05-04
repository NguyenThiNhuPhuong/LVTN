<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Discounts extends Model
{
    protected $table="discounts";
    protected $fillable = [
        'code',
        'discount',
        'description',
        'expiration_date',
        'purchase_current',
        'purchase_limit',
        'minium_order',
        'updated_by',
        'created_by'
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
