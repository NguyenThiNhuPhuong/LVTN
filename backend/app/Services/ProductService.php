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
            $request['images']=$images;
        }

        $product = $this->prouctRepository->createProduct($request);

        return $product;
    }

    public function updateProduct($id, $data)
    {
        $category = $this->prouctRepository->updateProduct($id, $data);

        return $category;
    }

    public
    function repariDataProduct($product, $images)
    {
        $product['category_name'] = $this->categoryRepository->getCategory($product['category_id'])->name;
        foreach ($images as $image) {
            $product['images'][] = $image['url'];
        }

        return $product;
    }

    public
    function repariListDataProduct($products)
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
