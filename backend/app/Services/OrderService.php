<?php

namespace App\Services;

use App\Models\Provinces;
use App\Repositories\AddressRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\ImageRepository;
use App\Repositories\OrderDetailRepository;
use App\Repositories\OrderRepository;
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
    protected $discountRepository;
    protected $imageRepository;
    private $orderStatusRepository;


    public function __construct()
    {
        $this->orderRepository = new OrderRepository;
        $this->orderDetailRepository = new OrderDetailRepository;
        $this->productRepository = new ProductRepository;
        $this->imageRepository = new ImageRepository;
        $this->userRepository = new UserRepository;
        $this->addressRepository = new AddressRepository;
        $this->discountRepository = new DiscountRepository;
        $this->orderStatusRepository = new OrderStatusService;


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
                $numCurrent = $product['num'] - $product['num_buy'];

                if ($item['cartNum'] > $numCurrent) {
                    throw new \Exception('The product is out of stock!');
                }

                $numBuy = $product['num_buy'] + $item['cartNum'];
                $this->productRepository->updateNumBuy($item['product_id'], $numBuy);

            }

            if ($request->discount_id != null) {
                $discount = $this->discountRepository->getDiscount($request->discount_id);
                $purchaseCurrent = $discount->purchase_current + 1;
                if ($purchaseCurrent > $discount->purchase_limit) {
                    throw new \Exception('Invalid discount code!');
                }
                $this->discountRepository->updatePurchaseCurrent($request->discount_id, $purchaseCurrent);
            }

            return $order;

        });

        return $rresult;
    }

    public function getListOrder($statusId, $perPage)
    {
        $user = Auth::user();

        if ($user->type == 1) {
            return $this->orderRepository->getListOrderAdmin($statusId, $perPage);
        }
        if ($user->type == 2) {
            return $this->orderRepository->getListOrderUser($user->id, $statusId, $perPage);
        }
        if ($user->type == 3) {
            if ($statusId == 2 || $statusId == 3 || $statusId == 4 || $statusId == 6){
                return $this->orderRepository->getListOrderShiper($statusId, $perPage);
            }
               return [];
        }


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
            $order['discount_code'] = $discount->code;
            $order['discount_price'] = $discount->discount;
        }

        foreach ($orderDetail as $item) {
            $productImages = [];
            $productName = $this->productRepository->getProduct($item['product_id'])['name'];
            $listImage = $this->imageRepository->getProductImage($item['product_id']);

            foreach ($listImage as $image) {
                $productImages[] = $image['url'];
            }

            $cart [] = [
                "product_id" => $item['product_id'],
                "product_name" => $productName,
                "images" => $productImages,
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

    public function updateOrderByStatus(string $id, $request)
    {
        $dataUpdate = [
            "order_status_id" => $request->order_status_id,
            "updated_by" => Auth::user()->id,
        ];

        $order = $this->orderRepository->getOrder($id);
        //check order exist
        if ($order == null) {
            return [
                "message" => "Order does not exist",
                "status" => 404
            ];
        }
        //update orderstatus 1 -> 2 (xác nận đơn hàng)
        if ($order['order_status_id'] == 1 && $request->order_status_id == 2 && Auth::user()->type == 1) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Order confirmation successful!";
                $status = 200;
            } else {
                $message = "Update order status error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }
        //update orderstatus 1 -> 5 (hủy đơn hàng)
        if ($order['order_status_id'] == 1 && $request->order_status_id == 5) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Canceled order successfully!";
                $status = 200;
            } else {
                $message = "Update order status error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }
        //update orderstatus 2 -> 3 (chờ lấy hàng)
        if ($order['order_status_id'] == 2 && $request->order_status_id == 3 && Auth::user()->type == 3) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Orders are shipping!";
                $status = 200;
            } else {
                $message = "Update order status error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }
        //update orderstatus 3 -> 4 (đã giao hàng thành công)
        if ($order['order_status_id'] == 3 && $request->order_status_id == 4 && Auth::user()->type == 3) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Order has been delivered successfully!";
                $status = 200;
            } else {
                $message = "Update order status error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }
        //update orderstatus 3 -> 6( trả hàng)
        if ($order['order_status_id'] == 3 && $request->order_status_id == 4 && Auth::user()->type == 3) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Order has been returned!";
                $status = 200;
            } else {
                $message = "Update order status error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }

        return [
            "message" => "Action Invalid ",
            "status" => 500
        ];
    }

    public function updateOrder($id, $request)
    {
        $dataUpdate = [
            "name" => $request->name,
            "phone" => $request->phone,
            "email" => $request->email,
            "province_id" => $request->province_id,
            "district_id" => $request->district_id,
            "ward_id" => $request->ward_id,
            "address" => $request->address,
            "note" => $request->note,
            "updated_by" => Auth::user()->id,
        ];

        $order = $this->orderRepository->getOrder($id);
        //check order exist
        if ($order == null) {
            return [
                "message" => "Order does not exist",
                "status" => 404
            ];
        }
        //check order not confirmed
        if ($order['order_status_id'] == 1) {
            $isUpdate = $this->orderRepository->updateOrder($id, $dataUpdate);
            if ($isUpdate) {
                $message = "Update order successfully!";
                $status = 200;
            } else {
                $message = "Update order error, please try again!";
                $status = 500;
            }
            return [
                "message" => $message,
                "status" => $status
            ];
        }

        return [
            "message" => "Order has been confirmed , cannot update!",
            "status" => 500
        ];
    }

    public function getListOrderUser($id, $statusId, $perPage)
    {
        return $this->orderRepository->getListOrderUser($id, $statusId, $perPage);
    }

    public function getPriceMonth($yearMonth)
    {
        return $this->orderRepository->getPriceMonth($yearMonth);
    }

    public function getPriceFullMonth( $year)
    {
        $dataFullMonth=[];
        $fullMonth=[
            $year.'-'.'01',
            $year.'-'.'02',
            $year.'-'.'03',
            $year.'-'.'04',
            $year.'-'.'05',
            $year.'-'.'06',
            $year.'-'.'07',
            $year.'-'.'08',
            $year.'-'.'09',
            $year.'-'.'10',
            $year.'-'.'11',
            $year.'-'.'12',
        ];
       foreach ($fullMonth as $month){
           $data=$this->getPriceMonth($month);
           $dataFullMonth[$month]=$data;
       }
       return $dataFullMonth;
    }

    public function getTotalStatus()
    {
        return $this->orderRepository->getTotalStatus();
    }


}
