<?php

namespace App\Http\Controllers;

use App\Repositories\AddressRepository;
use App\Services\AddressService;

class AddressController extends Controller
{

    protected $addressRepository;
    protected $addressService;

    public function __construct()
    {
        $this->addressRepository = new AddressRepository;
        $this->addressService = new AddressService;
    }

    public function getListProvince()
    {
        $result = $this->addressRepository->getAllProvince();
        return response()->json([
            'total'=>count($result),
            'rows' => $result
        ]);
    }

    public function getListDistrict()
    {
        $result = $this->addressRepository->getAllDistrict();
        return response()->json([
            'total'=>count($result),
            'rows' => $result
        ]);
    }

    public function getListWard()
    {
        $result = $this->addressRepository->getAllWard();
        return response()->json([
            'total'=>count($result),
            'rows' => $result
        ]);
    }
    public function getProvince(String $id)
    {
        $result = $this->addressRepository->getProvince($id);
        return response()->json([
            'province' => $result
        ]);
    }

    public function getDistrict(String $id)
    {
        $result = $this->addressRepository->getDistrict($id);
        return response()->json([
            'district' => $result
        ]);
    }

    public function getWard(String $id)
    {
        $result = $this->addressRepository->getWard($id);
        return response()->json([
            'ward' => $result
        ]);
    }
}
