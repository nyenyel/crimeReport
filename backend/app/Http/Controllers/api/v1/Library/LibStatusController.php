<?php

namespace App\Http\Controllers\api\v1\Library;

use App\Http\Controllers\Controller;
use App\Http\Resources\LibStatusResource;
use App\Models\Library\LibStatus;
use Illuminate\Http\Request;

class LibStatusController extends Controller
{
    protected $relation = [
        'report',
        'report.category',
        'report.status',
        'report.location',
        'report.image',
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(LibStatus $status)
    {
        $status->load($this->relation);
        return LibStatusResource::make($status);
    }

}
