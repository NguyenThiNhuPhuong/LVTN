<?php

namespace App\Repositories;
use App\Models\OrderStatus;

class OrderStatusRepository
{

    protected $modelClass = OrderStatus::class;


    public function getAllOrderStatus()
    {
        return  $this->modelClass::all();
    }

    public function getOrderStatus($orderStatusId)
    {
        return  $this->modelClass::find($orderStatusId);
    }

    public function createOrderStatus($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateOrderStatus($id, $data)
    {
        $orderStatus = $this->modelClass::findOrFail($id);
        $orderStatus->update($data);
        return $orderStatus;
    }

    public function deleteOrderStatus($id){
        $orderStatus = $this->modelClass::findOrFail($id);
        $orderStatus->delete();
        return $orderStatus;
    }
}
