<?php
namespace App\Services;


use App\Repositories\AddressRepository;
use Illuminate\Support\Facades\Auth;

class AddressService
{
    protected $addressRepository;

    public function __construct()
    {
        $this->addressRepository = new AddressRepository;
    }

}
