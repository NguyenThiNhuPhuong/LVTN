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

    public function insertImage($data)
    {
        return $this->modelClass::insert($data);

    }

    public function updateImage($id, $data)
    {
        $image = $this->modelClass::findOrFail($id);
        $image->update($data);
        return $image;
    }

    public function deleteProductImage($productId){
        $images = $this->modelClass::where('product_id', $productId)->get();
        foreach ($images as $image) {
            $image->delete();
        }
        return $images;
    }
}
