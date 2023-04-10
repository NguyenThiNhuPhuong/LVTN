<?php
namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;
use Illuminate\Support\Facades\Auth;

class ImageService
{
    protected $categoryRepository;
    protected $prouctRepository;

    public function __construct()
    {
        $this->categoryRepository = new CategoryRepository;
        $this->prouctRepository = new ProductRepository;
    }

    public function createCategory($data)
    {
        $category = $this->categoryRepository->createCategory($data);

        return $category;
    }

    public function updateCategory($id, $data)
    {
        $category = $this->categoryRepository->updateCategory($id, $data);

        return  $category;
    }

    public function deleteCategory($id)
    {
        $result="";
        $listProductCategory=$this->prouctRepository->getProductCategory($id);
        if(count($listProductCategory)>0){
          return  $result="The category contains products that cannot be deleted!";
        }else{
            $isDelete=$this->categoryRepository->deleteCategory($id);
            if($isDelete){
                return   $result="Delete category successful! ";
            }else{
                return  $result="Delete category error, please try again!";
            }
        }


    }

    public function repariDataRequest($request,$action){
        $category = [];
        switch ($action) {
            case 'add':
               $category = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'active' => 1,
                    'created_by'=>Auth::user()->id,
                    'updated_by'=>Auth::user()->id,
                ];
                break;
            case 'update':
                $category = [
                    'name' => $request->name,
                    'description' => $request->description,
                    'active' => $request->active ,
                    'updated_by'=>Auth::user()->id,
                ];
                break;

            default:
                break;
        }
        return  $category;

    }

}
