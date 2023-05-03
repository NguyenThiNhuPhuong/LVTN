<?php

namespace App\Http\Controllers;

use App\Http\Requests\DiscountRequest;
use App\Repositories\DiscountRepository;
use App\Services\DiscountService;
use Illuminate\Http\Request;

class DiscountController extends Controller
{
    protected $discountRepository;
    protected $discountService;

    public function __construct()
    {
        $this->discountRepository = new DiscountRepository;
        $this->discountService = new DiscountService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $result = $this->discountService->getListDiscount($request->date);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(DiscountRequest $request)
    {
        $discount = $this->discountService->repariDataRequest($request, 'add');
        $result = $this->discountService->createDiscount($discount);
        return response()->json([
            'discount' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $discount = $this->discountRepository->getDiscount($id);
        return response()->json([
            'discount' => $discount
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(DiscountRequest $request, string $id)
    {
        $discount = $this->discountService->repariDataRequest($request, 'update');
        $result = $this->discountService->updateDiscount($id, $discount);
        return response()->json([
            'discount' => $result
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->discountService->deleteDiscount($id);

        return response()->json([
            'message' => $result
        ]);
    }

    public function checkDiscount(Request $request)
    {
        $result = $this->discountService->checkDiscount($request->discount_code, $request->price_product);
        return response()->json([
            'message' => $result['message']
        ], $result['status']);
    }

    public function listDiscountValid(Request $request)
    {
        $result = $this->discountService->getListDiscountValid($request->date_time,$request->price_product);
        return response()->json([
            'total' => count($result),
            'rows' => $result
        ]);
    }

}
