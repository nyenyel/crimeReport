<?php

namespace App\Http\Controllers\api\v1\Library;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\LibStoreRequest;
use App\Http\Resources\LibraryResource;
use App\Models\Library\LibRank;
use App\Models\Library\LibRole;
use Illuminate\Http\Request;
use PharIo\Manifest\Library;

class LibRankController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return LibraryResource::collection(LibRank::all());
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LibStoreRequest $request)
    {
        $rank = LibRank::create($request->validated());
        return LibraryResource::make($rank);
    }

    /**
     * Display the specified resource.
     */
    public function show(LibRank $rank)
    {
        return LibraryResource::make($rank);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(LibStoreRequest $request, LibRank $rank)
    {
        $rank->update($request->validated());
        return LibraryResource::make($rank);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibRank $rank)
    {
        $rank->delete();
        return response()->json(['message' => 'Data Deleted']);
    }
}
