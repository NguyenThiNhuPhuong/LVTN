<?php

namespace App\Http\Controllers;

use App\Http\Requests\OrderRequest;
use App\Repositories\ImageRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Services\ImageService;
use App\Services\OrderService;
use App\Services\ProductService;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    protected $orderService;
    protected $orderRepository;
    protected $orderDetailRepository;

    public function __construct()
    {
        $this->orderDetailRepository = new OrderDetailRepository;
        $this->orderRepository = new OrderRepository;
        $this->orderService = new OrderService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = $this->orderRepository->getAllOrder();
        $result = $this->orderService->repariListDataOrder($orders);
        return response()->json([
            'rows' => $result
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $result = $this->orderService->createOrder($request);
        return response()->json([
            'order' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $order = $this->orderRepository->getOrder($id);
        $orderDetail = $this->orderDetailRepository->getOrderDetailByOrderId($id);
        $result = $this->orderService->repariDataOrder($order,$orderDetail);
        return response()->json([
            'order' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
