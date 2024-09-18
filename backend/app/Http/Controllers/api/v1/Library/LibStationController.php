<?php

namespace App\Http\Controllers\api\v1\Library;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\StationStoreRequest;
use App\Http\Requests\Update\StationUpdateRequest;
use App\Http\Resources\StationResource;
use App\Models\Library\LibStation;
use App\Models\Location;
use Illuminate\Http\Request;

class LibStationController extends Controller
{    
    protected $relation = [
        'location',
        'status'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data= LibStation::all();
        $data->load($this->relation);
        return StationResource::collection($data);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StationStoreRequest $request)
    {
        $data = $request->validated();
        $location = Location::create($data['location']);
        $data['info']['location_id']= $location->id;
        $station = LibStation::create($data['info']);
        $station->load($this->relation);
        return StationResource::make($station); 
    }

    /**
     * Display the specified resource.
     */
    public function show(LibStation $station)
    {
        $station->load($this->relation);
        return StationResource::make($station);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(StationUpdateRequest $request, LibStation $station)
    {
        $station->update($request->validated());
        $station->load($this->relation);
        return StationResource::make($station);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibStation $station)
    {
        $station->delete();
        return response()->json(['message'=> 'Data Deleted']);
    }
}
