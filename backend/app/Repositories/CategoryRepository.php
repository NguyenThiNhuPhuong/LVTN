<?php

namespace App\Repositories;
use App\Models\Categories;

class CategoryRepository
{

    protected $modelClass = Categories::class;
    protected $perPage =12;


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

    public function getListCategory($active,$perPage=null)
    {
        $perPage = $perPage ?? $this->perPage;
        $categorise = $this->modelClass::when($active, function ($query) use ($active) {
                $query->where('active', $active);
            })
            ->paginate($perPage);
        return $categorise;
    }

    public function getAll()
    {
        return $this->modelClass::all();
    }
}
