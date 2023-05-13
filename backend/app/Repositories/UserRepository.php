<?php

namespace App\Repositories;

use App\Models\Categories;
use App\Models\User;

class UserRepository
{

    protected $modelClass = User::class;
    protected $perPage = 12;

    public function getAllUser()
    {
        return $this->modelClass::all()->toArray();
    }

    public function getUser($userId)
    {
        return $this->modelClass::find($userId)->toArray();
    }

    public function createUser($data)
    {
        return $this->modelClass::create($data);

    }

    public function updateUser($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteUser($id)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }

    public function getAll()
    {
        return $this->modelClass::all();
    }


}
