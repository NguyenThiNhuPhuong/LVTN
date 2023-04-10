<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Categories extends Model
{
    use HasFactory,SoftDeletes;
    protected $table="categories";
    protected $guarded = [];
    protected $hidden = [
        'created_by',
        'updated_by',
        'deleted_at'
    ];
}
