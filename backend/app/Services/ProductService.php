<?php

namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\ImageRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductService
{
    protected $categoryRepository;
    protected $prouctRepository;
    protected $imageRepository;
    protected $productRepository;
    protected $orderRepository;

    public function __construct()
    {
        $this->categoryRepository = new CategoryRepository;
        $this->prouctRepository = new ProductRepository;
        $this->imageRepository = new ImageRepository;
        $this->productRepository = new ProductRepository;
        $this->orderRepository = new OrderRepository;
    }

    public function createProduct($request)
    {
        $request['images'] = [];
        $images = [];

        if ($request->hasFile('files')) {
            foreach ($request['files'] as $file) {
                $path = $file->store('products', 'public');
                $images[] = asset('storage/' . $path);
            }
            $request['images'] = $images;
        }
        $dataProduct = [
            "name" => $request->name,
            "category_id" => $request->category_id,
            "price" => $request->price,
            "price_sale" => $request->price_sale,
            "num" => $request->num,
            "num_buy" => 0,
            "description" => $request->description,
            "active" => 1,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];

        $rresult = DB::transaction(function () use ($dataProduct, $request) {

            $product = $this->productRepository->createProduct($dataProduct);
            $dataImage = [];

            foreach ($request->images as $image) {
                $dataImage[] = [
                    "product_id" => $product->id,
                    "url" => $image,
                    "created_by" => Auth::user()->id,
                    "updated_by" => Auth::user()->id,
                ];
            }

            $this->imageRepository->insertImage($dataImage);

            return $product;
        });

        return $rresult;
    }

    public function updateProduct($id, $request)
    {
        $dataProduct = [
            "name" => $request->name,
            "category_id" => $request->category_id,
            "price" => $request->price,
            "price_sale" => $request->price_sale,
            "num" => $request->num,
            "num_buy" => 0,
            "description" => $request->description,
            "active" => $request->active,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];

        $rresult = DB::transaction(function () use ($dataProduct, $id, $request) {

            if ($request->hasFile('file')) {
                $path = $request['file']->store('sliders', 'public');
                $image = asset('storage/' . $path);
                $dataSlider['image'] = $image;

                $oldImage = $this->sliderRepository->getSlider($id)->image;
                $filename = basename($oldImage);
                Storage::delete('public/sliders/' . $filename);
            }

            $product = $this->productRepository->updateProduct($id, $dataProduct);

            return $product;
        });
    }

    public function repariDataProduct($product, $images)
    {
        $product['category_name'] = $this->categoryRepository->getCategory($product['category_id'])->name;
        foreach ($images as $image) {
            $product['images'][] = $image['url'];
        }

        return $product;
    }

    public function repariListDataProduct($products)
    {
        $newProducts = [];
        foreach ($products as $product) {
            $productImages = $this->imageRepository->getProductImage($product['id']);
            $newProducts[] = $this->repariDataProduct($product, $productImages);
        }

        return $newProducts;
    }

    public
    function deleteProduct($id)
    {
        $result = "";
        $listOrderProduct = $this->orderRepository->getOrderProduct($id);
        if (count($listOrderProduct) > 0) {
            return $result = "The order contains products that cannot be deleted!";
        } else {
            $isDelete = DB::transaction(function () use ($id) {
                $this->productRepository->deleteProduct($id);
                $this->imageRepository->deleteProductImage($id);
            });
            if ($isDelete) {
                return $result = "Delete category successful! ";
            } else {
                return $result = "Delete category error, please try again!";
            }
        }


    }


}
