<?php

namespace App\Repositories;

use App\Models\Districts;
use App\Models\Orders;
use App\Models\Provinces;
use App\Models\Wards;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class OrderRepository
{

    protected $modelClass = Orders::class;

    public function getAllOrder()
    {
        return $this->modelClass::all()->toArray();
    }

    public function getListOrder($statusId)
    {
        return $this->modelClass::where('order_status_id',$statusId)->get()->toArray();
    }


    public function getOrder($id)
    {
        return $this->modelClass::find($id)->toArray();
    }


    public function getOrderProduct($productId)
    {
        return $this->modelClass::where('product_id', $productId)->get()->toArray();
    }


    public function createOrder($data)
    {
        return $this->modelClass::create($data);

    }

    public function getOrderByDiscount($discountId)
    {
        return $this->modelClass::where('discount_id', $discountId)->get()->toArray();
    }

    public function updateOrder($id, $data)
    {
        $order = $this->modelClass::findOrFail($id);
        return $order->update($data);
    }
}


