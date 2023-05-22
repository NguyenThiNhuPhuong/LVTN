<?php

namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\FeedbackRepository;
use App\Repositories\ImageRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class FeedbackService
{
    protected $feedbackRepository;


    public function __construct()
    {
        $this->feedbackRepository = new FeedbackRepository();

    }

    public function createFeedback($request)
    {
        $user = Auth::user();
        $dataFeedback = [
            'user_id' => $user->id,
            'email' => $request->email,
            'content' => $request->content,
        ];
        $feedback = $this->feedbackRepository->createFeedback($dataFeedback);
        return $feedback;
    }

    public function updateProduct($id, $request)
    {
        $dataProduct = [
            "name" => $request->name,
            "category_id" => $request->category_id,
            "price" => $request->price,
            "price_sale" => $request->price_sale,
            "description" => $request->description,
            "active" => $request->active,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];

        if ($request->add_num) {
            $oldProduct = $this->productRepository->getProduct($id);
            $dataProduct['num'] = $oldProduct['num'] + $request->add_num;
        }
        $result = DB::transaction(function () use ($dataProduct, $id, $request) {

            $product = $this->productRepository->updateProduct($id, $dataProduct);

            if ($request->hasFile('files')) {

                $dataImage = [];
                foreach ($request['files'] as $file) {
                    $path = $file->store('products', 'public');
                    $image = asset('storage/' . $path);
                    $dataImage[] = [
                        "product_id" => $id,
                        "url" => $image,
                        "created_by" => Auth::user()->id,
                        "updated_by" => Auth::user()->id,
                    ];
                }

                $listOldImage = $this->imageRepository->getProductImage($id);
                foreach ($listOldImage as $oldImage) {

                    $filename = basename($oldImage['url']);
                    Storage::delete('public/products/' . $filename);
                }
                $this->imageRepository->deleteProductImage($id);
                $this->imageRepository->insertImage($dataImage);
            }

            return $product;
        });
        return $result;
    }

    public function repariDataProduct($product, $images)
    {
        $product['num_current'] = $product['num'] - $product['num_buy'];
        $product['category_name'] = $this->categoryRepository->getCategory($product['category_id'])->name;
        $listImage = [];
        foreach ($images as $image) {
            $listImage[] = $image['url'];
        }
        $product['images'] = $listImage;
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
        $listOrderDetailProduct = $this->orderDetailRepository->getOrderDetailProduct($id);
        if (count($listOrderDetailProduct) > 0) {
            return $result = "The order contains products that cannot be deleted!";
        } else {
            $isDelete = DB::transaction(function () use ($id) {
                $listImage = $this->imageRepository->getProductImage($id);
                foreach ($listImage as $image) {
                    $filename = basename($image['url']);
                    Storage::delete('public/products/' . $filename);
                }
                $this->imageRepository->deleteProductImage($id);
                $this->productRepository->deleteProduct($id);
            });
            return $result = "Delete products successful! ";
        }


    }

    public function listProduct($request)
    {
        $products = $this->productRepository->getListProduct($request->category_id, $request->string, $request->min_price, $request->max_price, $request->sort, $request->per_page,);
        return $products;
    }

    public function getListFeedback($user_id, $per_page)
    {
        return $this->feedbackRepository->getListFeedback($user_id, $per_page);
    }


}
