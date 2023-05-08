<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Products extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = "products";
    protected $guarded = [];
    protected $fillable = [
        'name',
        'category_id',
        'price',
        'price_sale',
        'num',
        'num_buy',
        'description',
        'active',
        'updated_by',
        'created_by'
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
