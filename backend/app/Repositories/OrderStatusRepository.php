<?php

namespace App\Repositories;
use App\Models\OrderStatus;


class UserTypeRepository
{

    protected $modelClass = OrderStatus::class;


    public function getAllOrderStatus()
    {
        return  $this->modelClass::all()->toArray();
    }



}
