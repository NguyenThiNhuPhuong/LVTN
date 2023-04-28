<?php

namespace App\Services;

use App\Models\Provinces;
use App\Repositories\AddressRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
use App\Repositories\OrderStatusRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderService
{

    protected $orderRepository;
    protected $orderDetailRepository;
    protected $productRepository;
    protected $userRepository;
    protected $addressRepository;
    protected $orderStatusRepository;
    protected $discountRepository;


    public function __construct()
    {
        $this->orderRepository = new OrderRepository;
        $this->orderDetailRepository = new OrderDetailRepository;
        $this->productRepository = new ProductRepository;
        $this->userRepository = new UserRepository;
        $this->addressRepository = new AddressRepository;
        $this->discountRepository = new DiscountRepository;
        $this->orderStatusRepository = new OrderStatusRepository;
    }

    public function createOrder($request)
    {
        $code = "ĐH" . date('hsiymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
        $date = Carbon::now()->format("Y-m-d");
        $priceAll = $request->price_product + $request->price_ship;

        $dataOrder = [
            "code" => $code,
            "user_id" => Auth::user()->id,
            "name" => $request->name,
            "phone" => $request->phone,
            "email" => $request->email,
            "date" => $date,
            "discount_id" => $request->discount_id,
            "price_product" => $request->price_product,
            "price_ship" => $request->price_ship,
            "price_all" => $priceAll,
            "province_id" => $request->province_id,
            "district_id" => $request->district_id,
            "ward_id" => $request->ward_id,
            "address" => $request->address,
            "note" => $request->note,
            "order_status_id" => 1,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];

        $rresult = DB::transaction(function () use ($dataOrder, $request) {

            $order = $this->orderRepository->createOrder($dataOrder);

            foreach ($request->cart as $item) {

                $dataOrderDetail = [
                    'order_id' => $order->id,
                    'product_id' => $item['product_id'],
                    'num' => $item['cartNum'],
                    'price' => $item['price'],
                    'price_sale' => $item['price_sale']
                ];

                $this->orderDetailRepository->createOrderDetail($dataOrderDetail);

                $product = $this->productRepository->getProduct($item['product_id']);
                $num = $product['num'];
                $numBuy =  $product['num_buy'] + $item['cartNum'];

                if ($numBuy > $num) {
                    throw new \Exception('The product is out of stock!');
                }

                $this->productRepository->updateNumBuy($item['product_id'], $numBuy);

            }

            return $order;

        });

        return $rresult;
    }

    public function updateCategory($id, $data)
    {
        $category = $this->categoryRepository->updateCategory($id, $data);

        return $category;
    }

    public function deleteCategory($id)
    {
        $result = "";
        $listProductCategory = $this->prouctRepository->getProductCategory($id);
        if (count($listProductCategory) > 0) {
            return $result = "The category contains products that cannot be deleted!";
        } else {
            $isDelete = $this->categoryRepository->deleteCategory($id);
            if ($isDelete) {
                return $result = "Delete category successful! ";
            } else {
                return $result = "Delete category error, please try again!";
            }
        }


    }

    public function repariDataRequest($request, $action)
    {
        $category = [];
        switch ($action) {
            case 'add':
                $category = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'active' => 1,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ];
                break;
            case 'update':
                $category = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'active' => $request->active,
                    'updated_by' => Auth::user()->id,
                ];
                break;

            default:
                break;
        }
        return $category;

    }

    public function repariDataOrder($order, $orderDetail)
    {
        $cart = [];
        $order['user_name'] = $this->userRepository->getUser($order['user_id'])['name'];
        $order['province_name'] = $this->addressRepository->getProvince($order['province_id'])->name;
        $order['district_name'] = $this->addressRepository->getDistrict($order['district_id'])->name;
        $order['ward_name'] = $this->addressRepository->getWard($order['ward_id'])->name;
        $order['order_status_name'] = $this->orderStatusRepository->getOrderStatus($order['order_status_id'])->name;

        if ($order['discount_id'] != null) {
            $discount = $this->discountRepository->getDiscount($order['discount_id']);
            $order['discount_name'] = $discount->name;
            $order['discount_price'] = $discount->discount;
        }

        foreach ($orderDetail as $item) {
            $productName = $this->productRepository->getProduct($item['product_id'])['name'];
            $cart [] = [
                "product_id" => $item['product_id'],
                "product_name" => $productName,
                "cartNum" => $item['num'],
                "price" => $item['price'],
                "price_sale" => $item['price_sale']
            ];
        }

        $order['cart'] = $cart;

        return $order;
    }

    public function repariListDataOrder($orders)
    {
        $listOrder = [];
        foreach ($orders as $order) {
            $orderDetail = $this->orderDetailRepository->getOrderDetailByOrderId($order['id']);
            $listOrder[] = $this->repariDataOrder($order, $orderDetail);
        }

        return $listOrder;
    }

}
