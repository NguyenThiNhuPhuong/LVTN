<?php

namespace App\Services;


use App\Repositories\CategoryRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SliderRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SliderService
{
    protected $sliderRepository;

    public function __construct()
    {
        $this->sliderRepository = new SliderRepository;

    }

    public function createSlider($request)
    {
        if ($request->hasFile('file')) {

            $path = $request['file']->store('sliders', 'public');
            $image = asset('storage/' . $path);

            $request['image'] = $image;
        }

        $dataSlider = [
            "name" => $request->name,
            "link" => $request->link,
            "image" => $request->image,
            "active" => 1,
            "created_by" => Auth::user()->id,
            "updated_by" => Auth::user()->id,
        ];

        $slider = $this->sliderRepository->createSlider($dataSlider);

        return $slider;

    }

    public function updateSlider($id, $request)
    {
        $dataSlider = [
            'name' => $request->name,
            'link' => $request->link,
            'active' => $request->active
        ];

        $result = DB::transaction(function () use ($dataSlider, $id, $request) {

            if ($request->hasFile('file')) {
                $path = $request['file']->store('sliders', 'public');
                $image = asset('storage/' . $path);
                $dataSlider['image'] = $image;

                $oldImage = $this->sliderRepository->getSlider($id)->image;
                $filename = basename($oldImage);
                Storage::delete('public/sliders/'.$filename);
            }

            $slider = $this->sliderRepository->updateSlider($id, $dataSlider);

            return $slider;
        });

        return $result;


    }

    public function deleteSlider($id)
    {
        $result = "";

        $isDelete = $this->sliderRepository->deleteSlider($id);

        if ($isDelete) {
            return $result = "Delete slider successful! ";
        } else {
            return $result = "Delete slider error, please try again!";
        }
    }
}
