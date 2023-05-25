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
        $this->middleware('auth.admin')->only(['store','update','destroy']);
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $products= $this->productService->listProduct($request);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
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

    public function listProductActive(Request $request)
    {
        $products = $this->productRepository->getProductActive($request->per_page);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
        ]);
    }

    public function listProductByCategory(Request $request,string $id)
    {
        $products = $this->productRepository->getProductByCategory($id,$request->per_page);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
        ]);
    }

    public function listActiveOutOfStock(Request $request)
    {
        $products = $this->productRepository->getProductActiveOutOfStock($request->per_page);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
        ]);
    }

    public function listProductSale(Request $request)
    {
        $products = $this->productRepository->getProductSale($request->per_page);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
        ]);
    }

    public function listProductNew(Request $request)
    {
        $products = $this->productRepository->getProductNew($request->per_page);
        $result = $this->productService->repariListDataProduct($products->items());
        return response()->json([
            'currentPage' => $products->currentPage(),
            'data' => $result,
            'first_page_url' => $products->url(1),
            'last_page_url' => $products->url($products->lastPage()),
            'prev_page_url' => $products->previousPageUrl(),
            'next_page_url' => $products->nextPageUrl(),
            'from' => $products->firstItem(),
            'to' => $products->lastItem(),
            'per_page' => $products->perPage(),
            'totalPages' => $products->lastPage(),
            'total' => $products->total(),
        ]);
    }
}
