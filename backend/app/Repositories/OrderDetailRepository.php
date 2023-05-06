<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Models\OrderDetail;

class OrderDetailRepository
{

    protected $modelClass = OrderDetail::class;


    public function getAllOrderDetail()
    {
        return  $this->modelClass::all();
    }

    public function getOrderDetail($id)
    {
        return  $this->modelClass::find($id);
    }

    public function createOrderDetail($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateOrderDetail($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteOrderDetail($id){
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }

    public function getOrderDetailByOrderId(string $orderId)
    {
        $listOrderDetail = $this->modelClass::where('order_id',$orderId)
            ->get()->toArray();
        return $listOrderDetail;
    }

    public function getAll()
    {
        return $this->modelClass::all();
    }
}
