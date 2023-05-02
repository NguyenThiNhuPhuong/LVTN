<?php

namespace App\Services;

use App\Repositories\AddressRepository;
use App\Repositories\UserRepository;
use App\Repositories\UserTypeRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{
    protected $addressRepository;
    protected $userRepository;

    public function __construct()
    {
        $this->addressRepository = new AddressRepository;
        $this->userRepository = new UserRepository;
        $this->userTypeRepository = new UserTypeRepository;

    }

    public function createUser($data)
    {
        return $this->userRepository->createUser($data);
    }

    public function repariDataRequest($request, $action)
    {
        $user = [];
        switch ($action) {
            case 'add':
                $user = [
                    'name' => $request->name,
                    'avatar' => "https://tse2.mm.bing.net/th?id=OIP.lF8ztkPyzv_NrpD7V8YYVAHaHa&pid=Api&P=0",
                    'email' => $request->email,
                    'type' => $request->type,
                    'phone' => $request->phone,
                    'password' => Hash::make($request->password),
                    'province_id' => $request->province_id,
                    'district_id' => $request->district_id,
                    'ward_id' => $request->ward_id,
                    'address' => $request->address,
                    'created_by' => Auth::user()->id,
                    'updated_by' => Auth::user()->id,
                ];
                break;
            case 'update':
                $user = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'active' => $request->active,
                    'updated_by' => Auth::user()->id,
                ];
                break;

            default:
                break;
        }
        return $user;

    }

    public function repariDataUser($user)
    {
        $user['type_name'] = $this->userTypeRepository->getUserType($user['type'])->name;
        $user['province_name'] = $user['province_id'] ? $this->addressRepository->getProvince($user['province_id'])->name : null;
        $user['district_name'] = $user['district_id'] ? $this->addressRepository->getDistrict($user['district_id'])->name : null;
        $user['ward_name'] = $user['ward_id'] ? $this->addressRepository->getWard($user['ward_id'])->name : null;
        return $user;
    }

    public function repariListDataUser($users)
    {
        $newUsers = [];
        foreach ($users as $user) {
            $newUsers[] = $this->repariDataUser($user);
        }

        return $newUsers;
    }

}
