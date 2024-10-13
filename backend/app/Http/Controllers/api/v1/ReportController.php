<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\ReportStoreRequest;
use App\Http\Requests\Update\ReportUpdateRequest;
use App\Http\Resources\ReportResource;
use App\Models\Evidence;
use App\Models\Library\LibCategory;
use App\Models\Location;
use App\Models\Report;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    protected $relation = [
        'status',
        'category',
        'location',
        'image'

    ];
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $data = Report::all();
        $data->load($this->relation);
        return ReportResource::collection($data);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(ReportStoreRequest $request)
    {
        $data = $request->validated();
        $categoryExist = LibCategory::where('desc', $data['info']['category'])->first();
        if($categoryExist){
            $data['info']['lib_category_id'] = $categoryExist['id'];
        } else {
            $newCategory = LibCategory::create(['desc' => $data['info']['category']]);
            $data['info']['lib_category_id'] = $newCategory['id'];
        }

        $location = Location::create($data['location']);
        $data['info']['location_id'] = $location->id;

        $report = Report::create($data['info']);

        if ($request->hasFile('evidence')) {
            foreach ($request->file('evidence') as $file) {
                $filePath = $file->store('evidence', 'public');
                $url = asset('storage/' . $filePath);
                // Step 4.2: Create an Evidence record for each file
                Evidence::create([
                    'report_id' => $report->id, // link to the report
                    'image' => $url,         // store the file path
                ]);
            }
        }

        return ReportResource::make($report->load($this->relation));
    }

    /**
     * Display the specified resource.
     */
    public function show(Report $report)
    {
        return ReportResource::make($report->load($this->relation));
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(ReportUpdateRequest $request, Report $report)
    {
        $report->update($request->validated());
        $report->load($this->relation);
        return ReportResource::make($report);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Report $report)
    {
        $report->delete();
        return response()->json(['message' => 'Data Deleted']);
    }
}
