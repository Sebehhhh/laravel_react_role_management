<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class DashboardController extends Controller
{

    /**
     * Get dashboard data based on user role
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $userRole = $user->roles->first();
        
        $data = [
            'user' => $user->load('roles', 'permissions'),
            'stats' => [],
            'permissions' => $user->getAllPermissions()->pluck('name'),
        ];

        // Admin dashboard data
        if ($user->hasRole('admin')) {
            $recentUsers = User::with('roles')->latest()->take(5)->get();
            
            // Debug logging for recent users
            Log::info('Recent users data for dashboard:', [
                'user_id' => $user->id,
                'recent_users' => $recentUsers->map(function ($u) {
                    return [
                        'id' => $u->id,
                        'name' => $u->name,
                        'email' => $u->email,
                        'roles' => $u->roles->pluck('name')
                    ];
                })->toArray()
            ]);
            
            $data['stats'] = [
                'total_users' => User::count(),
                'total_roles' => Role::count(),
                'total_permissions' => Permission::count(),
                'recent_users' => $recentUsers,
            ];
        }
        
        // Moderator dashboard data
        elseif ($user->hasRole('moderator')) {
            $data['stats'] = [
                'total_users' => User::count(),
                'recent_users' => User::with('roles')->latest()->take(5)->get(),
            ];
        }
        
        // Regular user dashboard data
        else {
            $data['stats'] = [
                'welcome_message' => 'Welcome to your dashboard!',
                'profile' => $user->only(['name', 'email']),
            ];
        }

        return response()->json($data);
    }

    /**
     * Get current user profile
     */
    public function profile(Request $request)
    {
        $user = $request->user();
        return response()->json($user->load('roles', 'permissions'));
    }
}