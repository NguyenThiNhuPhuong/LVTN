<?php

namespace App\Http\Controllers;

use App\Http\Requests\SliderRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Repositories\ImageRepository;
use App\Repositories\ProductRepository;
use App\Repositories\SliderRepository;
use App\Services\ImageService;
use App\Services\ProductService;
use App\Services\SliderService;
use Illuminate\Http\Request;

class SliderController extends Controller
{
    protected $sliderService;
    protected $sliderRepository;

    public function __construct()
    {
        $this->sliderService = new SliderService;
        $this->sliderRepository = new SliderRepository;
        $this->middleware('auth.admin')->except(['index','show']);
    }
    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $sliders = $this->sliderRepository->getListSlider($request->active,$request->per_page);
        return response()->json([
            $sliders
        ]);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(SliderRequest $request)
    {
        $result = $this->sliderService->createSlider($request);
        return response()->json([
            'slider' => $result
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $result = $this->sliderRepository->getSlider($id);
        return response()->json([
            'slider' => $result
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SliderRequest $request, string $id)
    {

        $result = $this->sliderService->updateSlider($id, $request);
        return response()->json([
            'slider' => $result
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $result = $this->sliderService->deleteSlider($id);
        return response()->json([
            'message' => $result
        ]);
    }
}
