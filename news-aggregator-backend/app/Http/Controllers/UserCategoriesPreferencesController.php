<?php

namespace App\Http\Controllers;

use App\Models\UserCategoriesPreferences;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class UserCategoriesPreferencesController extends Controller
{
    public function show(Request $request): JsonResponse
    {
        $userId = $request->query('user_id');

       // Retrieve the "value" and "label" fields from user sources preferences by user_id
        $preferences = UserCategoriesPreferences::where('user_id', $userId)
        ->get(['value', 'label']);

        return response()->json($preferences);
    }

    public function store(Request $request): JsonResponse
    {
        // Validate the request data
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'value' => 'required',
            'label' => 'required',
        ]);

        // Create a new user sources preference
        $preference = UserCategoriesPreferences::create($request->all());
        return response()->json($preference, 201);
    }

    public function destroy(Request $request): JsonResponse
    {
        $userId = $request->query('user_id');
        $source = $request->query('value');

        // Find and delete the user sources preference by user_id and source
        $preference = UserCategoriesPreferences::where('user_id', $userId)
            ->where('value', $source)
            ->firstOrFail();

        $preference->delete();

        return response()->json($preference, 200);
    }
}
