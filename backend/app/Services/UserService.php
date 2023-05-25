<?php

namespace App\Services;

use App\Repositories\AddressRepository;
use App\Repositories\UserRepository;
use App\Repositories\UserTypeRepository;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

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

    public function updateUser($id, $data)
    {
        $oldImage = $this->userRepository->getUser($id)['avatar'];
        $fileName = basename($oldImage);
        Storage::delete('public/users/' . $fileName);

        $user = $this->userRepository->updateUser($id, $data);
        return $user;
    }

    public function repariDataRequest($request, $action)
    {
        $dataUser = [];
        switch ($action) {
            case 'add':
                $dataUser = [
                    'name' => $request->name,
                    'email' => $request->email,
                    'type' => $request->type,
                    'email_verified_at' => Carbon::now(),
                    'email_verification_token' => Carbon::now(),
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
                $dataUser = [
                    'name' => $request->name,
                    'type' => $request->type,
                    'phone' => $request->phone,
                    'province_id' => $request->province_id,
                    'district_id' => $request->district_id,
                    'ward_id' => $request->ward_id,
                    'address' => $request->address,
                    'updated_by' => Auth::user()->id,
                ];
                if ($request->hasFile('file')) {
                    $path = $request['file']->store('users', 'public');
                    $image = asset('storage/' . $path);
                    $dataUser['avatar'] = $image;
                }
                break;

            default:
                break;
        }
        return $dataUser;

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

    public function changePassword($request)
    {
        $user = Auth::user();
        $result=[
            'message' =>'The current password is incorrect, please try again!',
            'status' =>500
        ];

        if (Hash::check($request->current_password, $user->password)) {

            $data = [
                'password' => Hash::make($request->new_password),
            ];
            $this->userRepository->updateUser($user->id, $data);
            $result=[
                'message' =>'Change password successfully!',
                'status' =>200
            ];
        }
        return $result;
    }


}
