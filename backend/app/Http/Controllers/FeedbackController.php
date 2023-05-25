<?php

namespace App\Http\Controllers;

use App\Http\Requests\FeedbackRequest;
use App\Repositories\FeedbackRepository;
use App\Services\FeedbackService;
use Illuminate\Http\Request;

class FeedbackController extends Controller
{
    protected $feedbackRepository;
    protected $feedbackService;

    public function __construct()
    {
        $this->feedbackRepository = new FeedbackRepository;
        $this->feedbackService = new FeedbackService;
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $listFeedback = $this->feedbackService->getListFeedback($request->user_id,$request->per_page);

        return response()->json([
            $listFeedback
        ]);
    }



    /**
     * Store a newly created resource in storage.
     */
    public function store(FeedbackRequest $request)
    {
        $feedback=$this->feedbackService->createFeedback($request);
        return response()->json([
            'feedback' => $feedback
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }



    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
