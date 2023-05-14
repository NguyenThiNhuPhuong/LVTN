<?php

namespace App\Repositories;

use App\Models\Districts;
use App\Models\Orders;
use App\Models\Provinces;
use App\Models\Wards;
use Carbon\Carbon;
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

    public function getListOrderAdmin($statusId, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::when($statusId, function ($query) use ($statusId) {
            $query->where('order_status_id', $statusId);
        })->paginate($perPage);
    }

    public function getListOrderShiper($statusId, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;
        return $this->modelClass::when($statusId, function ($query) use ($statusId) {
            $query->where('order_status_id', $statusId);
        }, function ($query) {
            $query->whereIn('order_status_id',[2,3,4,6] );

        })->paginate($perPage);
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

    public function getPriceMonth($yearMonth)
    {
        $date = Carbon::parse($yearMonth . '-01');
        $year = $date->year;
        $month = $date->month;
        $priceAll = $this->modelClass::whereMonth('date', $month)
            ->WhereYear('date', $year)
            ->whereNull('deleted_at')
            ->where('order_status_id', '<>', 5)
            ->where('order_status_id', '<>', 6)
            ->sum('price_product');
        return $priceAll;
    }

    public function getPriceShiperMonth($shiperId, $yearMonth)
    {
        $date = Carbon::parse($yearMonth . '-01');
        $year = $date->year;
        $month = $date->month;
        $priceAll = $this->modelClass::join('order_approval', 'orders.id', 'order_approval.order_id')
            ->where('order_approval.user_id', $shiperId)
            ->where('order_approval.order_status_id', 4)
            ->whereMonth('order_approval.action_time', $month)
            ->WhereYear('order_approval.action_time', $year)
            ->whereNull('order_approval.deleted_at')
            ->whereNull('orders.deleted_at')
            ->sum('orders.price_ship');

        return $priceAll;
    }

    public function getTotalStatusShiper()
    {
        $statusCounts = $this->modelClass::select('order_status.name', DB::raw('COALESCE(COUNT(orders.id), 0) as total'))
            ->rightJoin('order_status', 'order_status.id', '=', 'orders.order_status_id')
            ->whereIn('order_status.id', [2, 3, 4, 6])
            ->groupBy('order_status.name')
            ->pluck('total', 'order_status.name')->toArray();
        return $statusCounts;
    }
    public function getTotalStatus()
    {
        $statusCounts = $this->modelClass::select('order_status.name', DB::raw('COALESCE(COUNT(orders.id), 0) as total'))
            ->rightJoin('order_status', 'order_status.id', '=', 'orders.order_status_id')
            ->groupBy('order_status.name')
            ->pluck('total', 'order_status.name')->toArray();
        return $statusCounts;
    }

}


