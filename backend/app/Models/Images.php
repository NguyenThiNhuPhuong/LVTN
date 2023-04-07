<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Images extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = "images";
    protected $fillable = [
        'product_id',
        'url'
    ];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
