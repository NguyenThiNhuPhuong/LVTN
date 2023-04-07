<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Models\Images;

class ImageRepository
{

    protected $modelClass = Images::class;


    public function getAllImage()
    {
        return  $this->modelClass::all();
    }

    public function getProductImage($productId)
    {
        return  $this->modelClass::where('product_id',$productId)->get()->toArray();
    }

    public function createImage($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateImage($id, $data)
    {
        $image = $this->modelClass::findOrFail($id);
        $image->update($data);
        return $image;
    }

    public function deleteProductImage($productId){
        $image = $this->modelClass::where('product_id',$productId);
        $image->delete();
        return $image;
    }
}
