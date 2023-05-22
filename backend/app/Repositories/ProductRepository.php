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
    protected $perPage = 12;


    public function getAllProduct($perPage = 12)
    {
        return $this->modelClass::paginate($perPage);
    }

    public function getProductActive($perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::where('active', 1)->paginate($perPage);
    }

    public function getProductByCategory($category_id, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::where('active', 1)
            ->where('category_id', $category_id)->paginate($perPage);
    }

    public function getProductActiveOutOfStock($perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::where('active', 1)
            ->where('num', 0)->paginate($perPage);
    }

    public function getProductSale($perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::whereNotNull('price_sale')
            ->where('num', '!=', 0)->paginate($perPage);
    }

    public function getProductNew($perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::latest('created_at')->limit(20)->paginate($perPage);
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
        $product = $this->modelClass::findOrFail($id);
        return $product->delete();

    }

    public function updateNumBuy($productId, $numBuy)
    {
        return $this->modelClass::where('id', $productId)
            ->update(['num_buy' => $numBuy]);
    }

    public function getListProduct($categoryId, $string, $minPrice, $maxPrice, $sort, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        $products = $this->modelClass::when($categoryId, function ($query) use ($categoryId) {
            $query->where('category_id', $categoryId);
        })
            ->where('name', 'LIKE', "%$string%")
            ->when($minPrice && $maxPrice, function ($query) use ($minPrice, $maxPrice) {
                $query->where(function ($query) use ($minPrice, $maxPrice) {
                    $query->whereBetween('price_sale', [$minPrice, $maxPrice])
                        ->orWhere(function ($query) use ($minPrice, $maxPrice) {
                            $query->whereNull('price_sale')
                                ->whereBetween('price', [$minPrice, $maxPrice]);
                        });
                });
            }, function ($query) use ($minPrice, $maxPrice) {
                if ($minPrice) {
                    $query->where(function ($query) use ($minPrice) {
                        $query->where('price_sale', '>=', $minPrice)
                            ->orWhere(function ($query) use ($minPrice) {
                                $query->whereNull('price_sale')
                                    ->where('price', '>=', $minPrice);
                            });
                    });
                }
                if ($maxPrice) {
                    $query->where(function ($query) use ($maxPrice) {
                        $query->where('price_sale', '<=', $maxPrice)
                            ->orWhere(function ($query) use ($maxPrice) {
                                $query->whereNull('price_sale')
                                    ->where('price', '<=', $maxPrice);
                            });
                    });
                }
            })
            ->when($sort, function ($query) use ($sort) {
                $query->orderBy('name', $sort);
            })
            ->paginate($perPage);
        return $products;
    }

}
