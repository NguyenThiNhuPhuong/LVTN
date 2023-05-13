<?php

namespace App\Repositories;
use App\Models\OrderStatus;


class OrderStatusRepository
{

    protected $modelClass = OrderStatus::class;


    public function getAllOrderStatus()
    {
        return  $this->modelClass::all()->toArray();
    }

    public function getOrderStatus($orderStatusId)
    {
        return  $this->modelClass::find($orderStatusId);
    }


}
