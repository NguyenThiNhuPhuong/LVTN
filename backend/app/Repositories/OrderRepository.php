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
    protected $perPage = 12;

    public function getAllOrder($perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::paginate($perPage);;
    }

    public function getListOrder($statusId, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::where('order_status_id', $statusId)->paginate($perPage);
    }


    public function getOrder($id)
    {
        return $this->modelClass::find($id);
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

    public function getListOrderUser($id, $statusId, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        $orders = $this->modelClass::where('user_id', $id)
            ->when($statusId, function ($query) use ($statusId) {
                $query->where('order_status_id', $statusId);
            })
            ->paginate($perPage);
        return $orders;
    }
}


