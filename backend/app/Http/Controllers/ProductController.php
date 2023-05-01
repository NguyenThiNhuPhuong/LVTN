<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Repositories\CategoryRepository;
use App\Repositories\ImageRepository;
use App\Repositories\ProductRepository;
use App\Services\CategoryService;
use App\Services\ImageService;
use App\Services\ProductService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    protected $productRepository;
    protected $productService;
    protected $imageRepository;
    protected $imageService;

    public function __construct()
    {
        $this->productRepository = new ProductRepository;
        $this->productService = new ProductService;
        $this->imageRepository = new ImageRepository;
        $this->imageService = new ImageService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productRepository->getAllProduct();
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = $this->productService->createProduct($request);
        $images = $this->imageRepository->getProductImage($product->id);
        $result = $this->productService->repariDataProduct($product, $images);
        return response()->json([
            'product' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = $this->productRepository->getProduct($id);
        $images = $this->imageRepository->getProductImage($id);
        $result = $this->productService->repariDataProduct($product, $images);
        return response()->json([
            'product' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $product = $this->productService->updateProduct($id, $request);
        $images = $this->imageRepository->getProductImage($id);
        $result = $this->productService->repariDataProduct($product, $images);
        return response()->json([
            'product' => $result
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $result = $this->productService->deleteProduct($id);

        return response()->json([
            'message' => $result
        ]);
    }

    public function listProductActive()
    {
        $products = $this->productRepository->getProductActive();
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }
    public function listProductByCategory( string $id)
    {
        $products = $this->productRepository->getProductByCategory( $id);
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    public function listActiveOutOfStock()
    {
        $products = $this->productRepository->getProductActiveOutOfStock();
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    public function listProductSale()
    {
        $products = $this->productRepository->getProductSale();
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    public function listProductNew()
    {
        $products = $this->productRepository->getProductNew();
        $result = $this->productService->repariListDataProduct($products);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }
}
