<?php

namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\DiscountRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
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


}
