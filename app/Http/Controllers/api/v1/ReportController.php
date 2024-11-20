<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\Store\ReportStoreRequest;
use App\Http\Requests\Update\ReportUpdateRequest;
use App\Http\Resources\ReportResource;
use App\Models\Evidence;
use App\Models\Library\LibCategory;
use App\Models\Library\LibStation;
use App\Models\Location;
use App\Models\Report;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

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
        try {
            // Log the start of the function sss
            Log::info('Store function started.');

            $data = $request->validated();
            Log::info('Validated data:', $data);

            $categoryExist = LibCategory::where('desc', $data['info']['category'])->first();
            if($categoryExist){
                $data['info']['lib_category_id'] = $categoryExist['id'];
            } else {
                $newCategory = LibCategory::create(['desc' => $data['info']['category']]);
                $data['info']['lib_category_id'] = $newCategory['id'];
            }

            $location = Location::create($data['location']);
            $data['info']['location_id'] = $location->id;
            Log::info('Location created:', ['location_id' => $location->id]);

            // Handle file uploads
            if ($request->hasFile('identification')) {
                $file = $request->file('identification');  
                if (is_array($file)) {
                    foreach ($file as $f) {
                        $filePath = $f->store('identification', 'public');
                        $url = asset('storage/' . $filePath);
                        Log::info('Identification file stored:', ['url' => $url]);
                        $data['info']['id_verification'] = $url;
                    }
                } else {
                    $filePath = $file->store('identification', 'public');
                    $url = asset('storage/' . $filePath);
                    Log::info('Single identification file stored:', ['url' => $url]);
                    $data['info']['id_verification'] = $url;
                }
            }

            $code = Str::random(20);
            $password = Str::random(10);
            $hash = Hash::make($password);
            $data['info']['code'] = $code; 
            $data['info']['password'] = $hash; 
            $report = Report::create($data['info']);

            // Log successful report creation
            Log::info('Report created:', ['report_id' => $report->id]);

            // Handle evidence files
            if ($request->hasFile('evidence')) {
                foreach ($request->file('evidence') as $file) {
                    $filePath = $file->store('evidence', 'public');
                    $url = asset('storage/' . $filePath);
                    Evidence::create([
                        'report_id' => $report->id,
                        'image' => $url,
                    ]);
                    Log::info('Evidence file stored:', ['url' => $url]);
                }
            }

            return response()->json(['code' => $code, 'password' => $password]);
        } catch (Exception $e) {
            // Log the error if something goes wrong
            Log::error('Error occurred in store function: ' . $e->getMessage(), [
                'error' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
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
    public function pnpReport (User $user){
        $reports = $user->dispatch;
        $reports->load($this->relation);
        return ReportResource::collection($reports);
    }

    public function quickResponse(Request $request) {
        try {
            // Log the start of the function sss
            Log::info('Store function started.');

            $data = $request->validate([
                'info.dispatch_user' => 'required',
                'info.reporter_account' => 'required',
                'info.title' => 'required',
                'info.reporter_name' => 'required',
                'info.category' => 'required',
                'info.lib_status_id' => 'required',
                'info.desc' => 'required',
                'location.lat' => 'required',
                'location.long' => 'required',
            ]);
            Log::info('Validated data:', $data);

            $categoryExist = LibCategory::where('desc', $data['info']['category'])->first();
            if($categoryExist){
                $data['info']['lib_category_id'] = $categoryExist['id'];
            } else {
                $newCategory = LibCategory::create(['desc' => $data['info']['category']]);
                $data['info']['lib_category_id'] = $newCategory['id'];
            }

            $location = Location::create($data['location']);
            $data['info']['location_id'] = $location->id;
            Log::info('Location created:', ['location_id' => $location->id]);


            $code = Str::random(20);
            $password = Str::random(10);
            $hash = Hash::make($password);
            $data['info']['code'] = $code; 
            $data['info']['password'] = $hash; 
            $report = Report::create($data['info']);

            // Log successful report creation
            Log::info('Report created:', ['report_id' => $report->id]);

            // Handle evidence files
            if ($request->hasFile('evidence')) {
                foreach ($request->file('evidence') as $file) {
                    $filePath = $file->store('evidence', 'public');
                    $url = asset('storage/' . $filePath);
                    Evidence::create([
                        'report_id' => $report->id,
                        'image' => $url,
                    ]);
                    Log::info('Evidence file stored:', ['url' => $url]);
                }
            }

            return response()->json(['code' => $code, 'password' => $password]);
        } catch (Exception $e) {
            // Log the error if something goes wrong
            Log::error('Error occurred in store function: ' . $e->getMessage(), [
                'error' => $e,
            ]);

            return response()->json(['error' => 'An error occurred while processing the request.'], 500);
        }
    }

    public function pnpResolved (User $user){
        $reports = $user->resolved;
        $reports->load($this->relation);
        return ReportResource::collection($reports);
    }

    public function pnpUnresolved (User $user){
        $reports = $user->unResolved;
        $reports->load($this->relation);
        return ReportResource::collection($reports);
    }
    public function myReport(Request $request) {
        $validated = $request->validate([
            'code' => 'required',
            'password' => 'required',
        ]);

        $report = Report::where('code', $validated['code'])->first();
        if(!$report || !Hash::check($validated['password'], $report->password)){
            return response()->json(['message' => 'Invalid Password'] ,402);
        }

        $report->load(['user', 'status', 'category']);
        return response()->json($report);
    }

    public function dashboard(){
        $status = [
            'pending' => $this->getPending(),
            'accepted' => $this->getAccepted(),
            'declined' => $this->getDeclined(),
            'dispatched' => $this->getDispatched(),
            'resolved' => $this->getResolved(),
        ];
        $data = [
            'status' => $status,
            'daily' => $this->getDailyReport(),
            'station' => $this->getStation()
        ];
        return response()->json($data);
    }
    private function getPending (){
        return Report::where('lib_status_id', 1)->count();
    }
    private function getAccepted (){
        return Report::where('lib_status_id', 2)->count();
    }
    private function getDeclined (){
        return Report::where('lib_status_id', 3)->count();
    }
    private function getDispatched (){
        return Report::where('lib_status_id', 4)->count();
    }
    private function getResolved (){
        return Report::where('lib_status_id', 5)->count();
    }
    private function getDailyReport(){
        $reports = DB::table('reports')
                    ->select(DB::raw('DATE(created_at) as date'), DB::raw('COUNT(*) as count'))
                    ->groupBy(DB::raw('DATE(created_at)'))
                    ->orderBy(DB::raw('DATE(created_at)'), 'asc')
                    ->get();

        return $reports;
    }
    private function getStation(){
        $station = LibStation::all();
        $station->load('location');
        return $station;
    }
}
