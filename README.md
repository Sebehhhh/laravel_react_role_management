# Laravel 12 + React SPA with Role-Based Authentication

A comprehensive full-stack application built with Laravel 12 backend API and React TypeScript frontend, featuring role-based authentication and permissions management using Spatie Laravel Permission.

## Features

- **Authentication**: Complete login/register system with Laravel Breeze API
- **Role-Based Access Control**: Dynamic roles and permissions management
- **REST API**: Clean API endpoints for all CRUD operations
- **React SPA**: Modern React TypeScript frontend with routing
- **Responsive Design**: Tailwind CSS for beautiful, mobile-first design
- **Real-time Updates**: Axios for API communication
- **Protected Routes**: Route-level security based on user permissions
- **Dashboard**: Role-specific dashboard views (Admin, Moderator, User)
- **User Management**: CRUD operations for users with role assignment
- **Role Management**: Create, edit, and delete roles with permission assignment
- **Permission Management**: Manage system permissions

## Tech Stack

### Backend
- Laravel 12
- Laravel Breeze API (Authentication)
- Spatie Laravel Permission (Role & Permission management)
- MySQL Database
- Laravel Sanctum (API authentication)

### Frontend
- React 18
- TypeScript
- React Router DOM
- Axios (API calls)
- Tailwind CSS (Styling)
- Context API (State management)

## Prerequisites

- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd laravel_app
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (backend + frontend)
   npm run setup
   
   # Or manually:
   composer install
   cd frontend && npm install
   ```

3. **Environment Setup**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

4. **Database Configuration**
   
   Update your `.env` file with database credentials:
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=laravel_app
   DB_USERNAME=root
   DB_PASSWORD=
   ```

5. **Create Database**
   ```bash
   mysql -u root -e "CREATE DATABASE IF NOT EXISTS laravel_app;"
   ```

6. **Run Migrations and Seeders**
   ```bash
   php artisan migrate:fresh --seed
   ```

## Development

### Quick Start
```bash
# Run both backend and frontend concurrently
npm run dev
```

### Individual Services
```bash
# Backend only (Laravel API)
npm run dev:backend
# or
php artisan serve

# Frontend only (React)
npm run dev:frontend
# or
cd frontend && npm start
```

### URLs
- **Backend API**: http://localhost:8000/api
- **Frontend**: http://localhost:3000

## Default Users

After running the seeders, you'll have these default users:

| Email | Password | Role |
|-------|----------|------|
| admin@example.com | password123 | Admin |
| moderator@example.com | password123 | Moderator |
| user@example.com | password123 | User |

## API Endpoints

### Authentication
- `POST /api/login` - User login
- `POST /api/register` - User registration
- `POST /api/logout` - User logout
- `GET /api/user` - Get authenticated user
- `GET /api/dashboard` - Get dashboard data
- `GET /api/profile` - Get user profile

### User Management
- `GET /api/users` - List users (paginated)
- `POST /api/users` - Create user
- `GET /api/users/{id}` - Get user details
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

### Role Management
- `GET /api/roles` - List roles (paginated)
- `POST /api/roles` - Create role
- `GET /api/roles/{id}` - Get role details
- `PUT /api/roles/{id}` - Update role
- `DELETE /api/roles/{id}` - Delete role

### Permission Management
- `GET /api/permissions` - List permissions (paginated)
- `POST /api/permissions` - Create permission
- `GET /api/permissions/{id}` - Get permission details
- `PUT /api/permissions/{id}` - Update permission
- `DELETE /api/permissions/{id}` - Delete permission

## Permissions System

### Available Permissions
- `view-users` - View users list
- `create-users` - Create new users
- `edit-users` - Edit existing users
- `delete-users` - Delete users
- `view-roles` - View roles list
- `create-roles` - Create new roles
- `edit-roles` - Edit existing roles
- `delete-roles` - Delete roles
- `view-permissions` - View permissions list
- `create-permissions` - Create new permissions
- `edit-permissions` - Edit existing permissions
- `delete-permissions` - Delete permissions
- `view-dashboard` - Access dashboard
- `manage-settings` - Manage system settings

### Default Roles
- **Admin**: All permissions
- **Moderator**: View users, roles, permissions, and dashboard
- **User**: Basic dashboard access only

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both backend and frontend |
| `npm run dev:backend` | Start Laravel API server |
| `npm run dev:frontend` | Start React development server |
| `npm run build` | Build React for production |
| `npm run fresh` | Fresh database migration with seeders |
| `npm run setup` | Install all dependencies |
| `npm run test` | Run Laravel tests |

## Security Features

- **API Authentication**: Laravel Sanctum tokens
- **CSRF Protection**: Built-in Laravel CSRF protection
- **Input Validation**: Request validation for all endpoints
- **Permission Middleware**: Route-level permission checking
- **Password Hashing**: Bcrypt password hashing
- **Rate Limiting**: API rate limiting protection

## License

This project is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
# laravel_react_role_management
