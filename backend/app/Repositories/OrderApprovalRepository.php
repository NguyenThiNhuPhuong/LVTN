<?php

namespace App\Repositories;

use App\Models\Categories;
use App\Models\OrderApproval;
use App\Models\OrderDetail;

class OrderApprovalRepository
{

    protected $modelClass = OrderApproval::class;


    public function createOrderApproval($data)
    {
        return $this->modelClass::create($data);

    }

    public function updateOrderApproval($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteOrderApproval($id)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }

    public function getOrderApprovalByOrderId(string $orderId)
    {
        $listOrderApproval = $this->modelClass::where('order_id', $orderId)
            ->get()->toArray();
        return $listOrderApproval;
    }

}
