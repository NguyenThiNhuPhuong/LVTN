<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Models\Sliders;

class SliderRepository
{

    protected $modelClass = Sliders::class;
    protected $perPage =12;

    public function getAllSlider()
    {
        return  $this->modelClass::all();
    }

    public function getSlider($sliderId)
    {
        return  $this->modelClass::find($sliderId);
    }

    public function createSlider($data)
    {
        return $this->modelClass::create($data);
    }

    public function updateSlider($id, $data)
    {
        $slider = $this->modelClass::findOrFail($id);
        $slider->update($data);
        return $slider;
    }

    public function deleteSlider($id){
        $slider = $this->modelClass::findOrFail($id);
        $slider->delete();
        return $slider;
    }

}
