<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use App\Http\Requests\ChangeLocationRequest;
use App\Http\Requests\CommunityAccountRegisterRequest;
use App\Http\Requests\LoginRequest;
use App\Http\Requests\Store\RegistrationRequest;
use App\Http\Requests\VerifyCommunityUserRequest;
use App\Http\Resources\LocationResource;
use App\Http\Resources\UserResource;
use App\Http\Service\LoginService;
use App\Models\Location;
use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    protected $relation = [
        'role',
        'gender',
        'location',
        'rank'
    ];
    protected $loginService;
    public function __construct(LoginService $loginService){
        $this->loginService = $loginService;
    }
    public function register(RegistrationRequest $request){

        $data = $request->validated();
        $location = Location::create([
            'lat'=> 0,
            'long' => 0
        ]);
        $data['location_id'] = $location->id;
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => UserResource::make($user->load($this->relation))
        ]);
    }
    public function login(LoginRequest $request){
        $user = $request->validated();
        return $this->loginService->checkCredential($user);
    }

    public function logout(Request $request){
        $request->user()->tokens()->delete();
        return response()->json([
            'message' => 'You are logged out'
        ]);
    }

    public function changeLocation(ChangeLocationRequest $request, User $location){
        $location->location->update($request->validated());
        return LocationResource::make($location->location);
    }

    public function registerAsCommunity(VerifyCommunityUserRequest $request){

        $data = $request->validated();
        $location = Location::create([
            'lat'=> 0,
            'long' => 0
        ]);
        $data['location_id'] = $location->id;
        $user = User::create($data);
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => UserResource::make($user->load($this->relation))
        ]);
    }
}
