<?php

namespace App\Http\Controllers;

use App\Http\Requests\CategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CategoryService;
use App\Repositories\CategoryRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CategoryController extends Controller
{
    protected $categoryRepository;
    protected $categoryService;

    public function __construct()
    {
        $this->categoryRepository = new CategoryRepository;
        $this->categoryService = new CategoryService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $result = $this->categoryRepository->getAllCategory();
        return response()->json([
            'rows' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(CategoryRequest $request)
    {
        $category=$this->categoryService->repariDataRequest($request,'add');
        $result = $this->categoryService->createCategory( $category);
        return response()->json([
            'category' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->categoryRepository->getCategory($id);
        return response()->json([
            'category' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, string $id)
    {
        $category=$this->categoryService->repariDataRequest($request,'update');
        $result = $this->categoryService->updateCategory($id, $category);
        return response()->json([
            'category' => $result
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {

        $result = $this->categoryService->deleteCategory($id);

            return response()->json([
                'message' => $result
            ]);
    }
}
