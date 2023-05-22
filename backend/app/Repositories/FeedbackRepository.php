<?php

namespace App\Repositories;
use App\Models\Categories;
use App\Models\Feedback;

class FeedbackRepository
{

    protected $modelClass = Feedback::class;
    protected $perPage =12;


    public function getAllFeedback()
    {
        return  $this->modelClass::all();
    }

    public function getFeedback($feedbackId)
    {
        return  $this->modelClass::find($feedbackId);
    }

    public function createFeedback($data)
    {
        return $this->modelClass::create($data);

    }
    public function updateFeedback($id, $data)
    {
        $feedback = $this->modelClass::findOrFail($id);
        $feedback->update($data);
        return $feedback;
    }

    public function deleteFeedback($id){
        $feedback = $this->modelClass::findOrFail($id);
        $feedback->delete();
        return $feedback;
    }



    public function getListFeedback($userId, $perPage = null)
    {
        $perPage = $perPage ?? $this->perPage;

        $feedback = $this->modelClass::when($userId, function ($query) use ($userId) {
            $query->where('user_id', $userId);
        })
            ->paginate($perPage);
        return $feedback;
    }

}
