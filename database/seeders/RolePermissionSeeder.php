<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create permissions
        $permissions = [
            'view-users',
            'create-users',
            'edit-users',
            'delete-users',
            'view-roles',
            'create-roles',
            'edit-roles',
            'delete-roles',
            'view-permissions',
            'create-permissions',
            'edit-permissions',
            'delete-permissions',
            'view-dashboard',
            'manage-settings',
        ];

        foreach ($permissions as $permission) {
            Permission::create(['name' => $permission]);
        }

        // Create roles and assign permissions
        $adminRole = Role::create(['name' => 'admin']);
        $userRole = Role::create(['name' => 'user']);
        $moderatorRole = Role::create(['name' => 'moderator']);

        // Admin gets all permissions
        $adminRole->givePermissionTo(Permission::all());

        // User gets basic permissions
        $userRole->givePermissionTo([
            'view-dashboard',
        ]);

        // Moderator gets some permissions
        $moderatorRole->givePermissionTo([
            'view-users',
            'view-roles',
            'view-permissions',
            'view-dashboard',
        ]);
    }
}