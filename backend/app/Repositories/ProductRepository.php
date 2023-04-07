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
    protected $modelImageClass = Images::class;
    protected $productService = ProductService::class;

    public function getAllProduct()
    {
        return $this->modelClass::all()->toArray();
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

        $dataProduct = [
            "name" => $data->name,
            "category_id" => $data->category_id,
            "price" => $data->price,
            "price_sale" => $data->price_sale,
            "num" => $data->num,
            "num_buy" => 1,
            "description" => $data->description,
            "active" => 1,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];
        $rresult = DB::transaction(function () use ($dataProduct, $data) {
            $product = $this->modelClass::create($dataProduct);
            $dataImage = [];
            foreach ($data->images as $image) {
                $dataImage[] = [
                    "product_id" => $product->id,
                    "url" => $image,
                    "created_by" => Auth::user()->id,
                    "updated_by" => Auth::user()->id,
                ];
            }
            $this->modelImageClass::insert($dataImage);
            return $product;
        });
        return $rresult;

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
}
