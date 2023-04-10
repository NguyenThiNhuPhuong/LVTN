<?php

namespace App\Repositories;
use App\Models\Categories;

class CategoryRepository
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
        $category = $this->modelClass::findOrFail($id);
        $category->update($data);
        return $category;
    }

    public function deleteCategory($id){
        $category = $this->modelClass::findOrFail($id);
        $category->delete();
        return $category;
    }
}
