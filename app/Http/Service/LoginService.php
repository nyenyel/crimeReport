<?php

namespace App\Http\Service;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginService
{
    public function checkCredential($data){
        $user = User::where('email', $data['email'])->first();
        if(!$user || !Hash::check($data['password'], $user->password)){
            return response()->json(['message' => 'Invalid Credential'] ,402);
        }
        if(!$user->isVerified){
            return response()->json(['message' => 'Account Not Verified.'] ,402);

        }
        $token = $user->createToken('auth_token')->plainTextToken;
        $user->load(['role', 'location']);
        return response()->json([
            'user' => UserResource::make($user),
            'token' => $token
        ]);
    }
}