<?php

namespace App\Repositories;
use App\Models\Categories;

class UserRepository
{

    protected $modelClass = Categories::class;


    public function getAllCategory()
    {
        return  $this->modelClass::all();
    }

    public function getCategory($categoryId)
    {
        return  $this->modelClass::find($categoryId);
    }

    public function createCategory($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateCategory($id, $data)
    {
        $user = $this->modelClass::findOrFail($id);
        $user->update($data);
        return $user;
    }

    public function deleteCategory($id){
        $user = $this->modelClass::findOrFail($id);
        $user->delete();
        return $user;
    }
}
