<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sliders extends Model
{
    use HasFactory;
    protected $table="sliders";
    protected $fillable = [
        'name',
        'link',
        'image',
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
