<?php

namespace App\Http\Controllers\api\v1\Library;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\LibStoreRequest;
use App\Http\Resources\LibraryResource;
use App\Models\Library\LibCategory;
use Illuminate\Http\Request;

class LibCategoryController extends Controller
{
    protected $relation = [
        // 'report'
    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $category = LibCategory::all();
        return LibraryResource::collection($category);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(LibStoreRequest $request)
    {
        $category = LibCategory::create($request->validated());
        return LibraryResource::make($category);
    }

    /**
     * Display the specified resource.
     */
    public function show(LibCategory $libCategory)
    {
        $libCategory->load($this->relation);
        return LibraryResource::make($libCategory);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(LibStoreRequest $request, LibCategory $libCategory)
    {
        $libCategory->update($request->validated());
        return LibraryResource::make($libCategory->fresh());
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(LibCategory $libCategory)
    {
        $libCategory->delete();
        return response()->json(['message' => 'Data Deleted']);
    }

}
