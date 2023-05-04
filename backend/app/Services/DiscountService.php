<?php

namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class DiscountService
{

    protected $discountRepository;
    protected $orderRepository;

    public function __construct()
    {
        $this->discountRepository = new DiscountRepository;
        $this->orderRepository = new OrderRepository;

    }

    public function createDiscount($data)
    {
        $discount = $this->discountRepository->createDiscount($data);

        return $discount;
    }


    public function updateDiscount($id, $data)
    {
        $category = $this->discountRepository->updateDiscount($id, $data);

        return $category;
    }

    public function deleteDiscount($id)
    {
        $result = "";
        $listOrder = $this->orderRepository->getOrderByDiscount($id);
        if (count($listOrder) > 0) {
            return $result = "The discount contains products that cannot be deleted!";
        } else {
            $isDelete = $this->discountRepository->deleteDiscount($id);
            if ($isDelete) {
                return $result = "Delete discount successful! ";
            } else {
                return $result = "Delete discount error, please try again!";
            }
        }


    }

    public function repariDataRequest($request, $action)
    {
        $discount = [];
        switch ($action) {
            case 'add':
                $discount = [
                    'code' => $request->code,
                    'description' => $request->description,
                    'discount' => $request->discount,
                    'expiration_date' => $request->expiration_date,
                    'purchase_current' => 0,
                    'purchase_limit' => $request->purchase_limit,
                    'minium_order' => $request->minium_order,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ];
                break;
            case 'update':
                $discount = [
                    'code' => $request->code,
                    'description' => $request->description,
                    'discount' => $request->discount,
                    'purchase_limit' => $request->purchase_limit,
                    'expiration_date' => $request->expiration_date,
                    'minium_order' => $request->minium_order,
                    'updated_by' => Auth::user()->id,
                ];
                break;

            default:
                break;
        }
        return $discount;

    }

    public function getListDiscount($date = null)
    {

        if ($date == null) {
            return $this->discountRepository->getAllDiscount();

        }
        return $this->discountRepository->getDiscountByDate($date);
    }

    public function checkDiscount($discount_code, $priceProduct)
    {
        $discount = $this->discountRepository->getDiscountByCode($discount_code);
        $currentDateTime = Carbon::now();
        //check invalid discount
        if ($discount == null) {
            return [
                'message' => "Invalid discount code",
                'discount' => null,
                'status' => 404
            ];
        }

        //check expiration date discount
        $diffInHours = $currentDateTime->diffInHours($discount->expiration_date, false);
        if ($diffInHours < 0) {
            return [
                'message' => "Expired discount code!",
                'discount' => null,
                'status' => 500
            ];
        }

        //check purchase limit discount
        if ($discount->purchase_current == $discount->purchase_limit) {
            return [
                'message' => "The discount code has reached its limit!",
                'discount' => null,
                'status' => 500
            ];
        }

        //check minimum order discount
        if ($priceProduct < $discount->minium_order) {
            return [
                'message' => "Orders are not eligible to use discount codes. Discount codes only apply to orders of {$discount->minium_order} VND or more!",
                'discount' => null,
                'status' => 500
            ];
        }

        return [
            'message' => 'Successfully applied discount code',
            'discount' => $discount,
            'status' => 200
        ];
    }

    public function getListDiscountValid($dateTime, $priceProduct)
    {
        return $this->discountRepository->getDiscountValid($dateTime, $priceProduct);
    }

}
