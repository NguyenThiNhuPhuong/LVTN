<?php

namespace App\Repositories;


use App\Models\Images;
use App\Models\Products;
use App\Services\ProductService;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductRepository
{

    protected $modelClass = Products::class;

    public function getAllProduct()
    {
        return $this->modelClass::all()->toArray();
    }
    public function getProductActive()
    {
        return $this->modelClass::where('active',1)->get()->toArray();
    }
    public function getProductActiveOutOfStock()
    {
        return $this->modelClass::where('active',1)
            ->where('num',0)->get()->toArray();
    }
    public function getProduct($id)
    {
        return $this->modelClass::find($id)->toArray();
    }

    public function getProductCategory($categoryId)
    {
        return $this->modelClass::where('category_id', $categoryId)->get();
    }

    public function createProduct($data)
    {
        return $this->modelClass::create($data);
    }

    public function updateProduct($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteProduct($id)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }

    public function updateNumBuy($productId, $numBuy)
    {
        return $this->modelClass::where('id',$productId)
            ->update(['num_buy' => $numBuy]);
    }

}
