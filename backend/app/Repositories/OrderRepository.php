<?php

namespace App\Repositories;

use App\Models\Districts;
use App\Models\Orders;
use App\Models\Provinces;
use App\Models\Wards;

class OrderRepository
{

    protected $modelClass = Orders::class;



    public function getAllProvince()
    {
        return  $this->modelProvince::all();
    }
    public function getOrderProduct($productId)
    {
        return  $this->modelClass::where('product_id',$productId)->get()->toArray();
    }
    public function getAllDistrict()
    {
        return  $this->modelDistrict::all();
    }
    public function getAllWard()
    {
        return  $this->modelWard::all();
    }
    public function getProvince($provinceId)
    {
        return  $this->modelProvince::find($provinceId);
    }

    public function getDistrict($districtId)
    {
        return  $this->modelDistrict::find($districtId);
    }
    public function getWard($wardId)
    {
        return  $this->modelWard::find($wardId);
    }
}
