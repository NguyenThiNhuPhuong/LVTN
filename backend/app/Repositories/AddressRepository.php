<?php

namespace App\Repositories;

use App\Models\Districts;
use App\Models\Provinces;
use App\Models\Wards;

class AddressRepository
{

    protected $modelProvince = Provinces::class;
    protected $modelDistrict = Districts::class;
    protected $modelWard = Wards::class;


    public function getAllProvince()
    {
        return  $this->modelProvince::all();
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
