<?php

namespace App\Services;

use App\Repositories\AddressRepository;
use App\Repositories\CategoryRepository;
use App\Repositories\OrderStatusRepository;
use App\Repositories\ProductRepository;
use App\Repositories\UserRepository;
use App\Repositories\UserTypeRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class OrderStatusService
{

    protected $orderStatusRepository;


    public function __construct()
    {
        $this->orderStatusRepository = new OrderStatusRepository;

    }

    public function getOrderStatus($orderStatusId)
    {
        return $this->orderStatusRepository->getOrderStatus($orderStatusId);
    }
}
