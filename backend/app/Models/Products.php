<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

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
        'active'
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
