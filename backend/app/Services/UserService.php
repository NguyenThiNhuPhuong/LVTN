<?php

namespace App\Services;

use App\Repositories\AddressRepository;

class UserService
{
    protected $addressRepository;

    public function __construct()
    {
        $this->addressRepository = new AddressRepository;

    }

    public function repariDataUser($user)
    {
        $user['province_name'] = $user['province_id'] ? $this->addressRepository->getProvince($user['province_id'])->name : null;
        $user['district_name'] = $user['district_id'] ? $this->addressRepository->getDistrict($user['district_id'])->name : null;
        $user['ward_name'] = $user['ward_id'] ? $this->addressRepository->getWard($user['ward_id'])->name : null;
        return $user;
    }

}
