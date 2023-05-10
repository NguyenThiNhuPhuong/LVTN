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
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

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
    public function index(OrderRequest $request)
    {
        $orders = $this->orderService->getListOrder($request->status_id, $request->per_page);
        $result = $this->orderService->repariListDataOrder($orders->items());
        return response()->json([
            'currentPage' => $orders->currentPage(),
            'data' => $result,
            'first_page_url' => $orders->url(1),
            'last_page_url' => $orders->url($orders->lastPage()),
            'prev_page_url' => $orders->previousPageUrl(),
            'next_page_url' => $orders->nextPageUrl(),
            'from' => $orders->firstItem(),
            'to' => $orders->lastItem(),
            'per_page' => $orders->perPage(),
            'totalPages' => $orders->lastPage(),
            'total' => $orders->total(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(OrderRequest $request)
    {
        $order = $this->orderService->createOrder($request);
        $orderDetail = $this->orderDetailRepository->getOrderDetailByOrderId($order->id);
        $result = $this->orderService->repariDataOrder($order, $orderDetail);
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
        $result = $this->orderService->repariDataOrder($order, $orderDetail);
        return response()->json([
            'order' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(OrderRequest $request, string $id)
    {
        $result = $this->orderService->updateOrder($id, $request);
        return response()->json([
            'message' => $result['message']
        ], $result['status']);
    }

    public function updateByStatus(Request $request, string $id)
    {
        $result = $this->orderService->updateOrderByStatus($id, $request);
        return response()->json([
            'message' => $result['message']
        ], $result['status']);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function listOrderOfUser(OrderRequest $request, string $id)
    {
        $currentUser = Auth::user();
        if ($currentUser->type == 1 || $currentUser->id == $id) {
            $orders = $this->orderService->getListOrderUser($id, $request->status_id, $request->per_page);
            $result = $this->orderService->repariListDataOrder($orders->items());
            return response()->json([
                'currentPage' => $orders->currentPage(),
                'data' => $result,
                'first_page_url' => $orders->url(1),
                'last_page_url' => $orders->url($orders->lastPage()),
                'prev_page_url' => $orders->previousPageUrl(),
                'next_page_url' => $orders->nextPageUrl(),
                'from' => $orders->firstItem(),
                'to' => $orders->lastItem(),
                'per_page' => $orders->perPage(),
                'totalPages' => $orders->lastPage(),
                'total' => $orders->total(),
            ]);
        }
        return response()->json([
            'message' => "Forbidden"
        ], 403);

    }

    public function getPriceMonth(Request $request)
    {
        $priceAll = $this->orderService->getPriceMonth($request->year_month);

        return response()->json([
            'year_month' => $request->year_month,
            'price_all' => $priceAll
        ]);
    }

    public function getPriceFullMonth(Request $request)
    {
        $result = $this->orderService->getPriceFullMonth($request->year);
        return response()->json([$result]);
    }

    public function getTotalStatus()
    {
        $result = $this->orderService->getTotalStatus();
        return response()->json([
            $result
        ]);
    }
}
