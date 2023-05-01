<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Models\User;
use App\Models\UserType;

class UserTypeRepository
{

    protected $modelClass = UserType::class;


    public function getAllUserType()
    {
        return  $this->modelClass::all()->toArray();
    }

    public function getUserType($userTypeId)
    {
        return  $this->modelClass::find($userTypeId);
    }

    public function createUserType($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateUserType($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteUserType($id){
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }
}
