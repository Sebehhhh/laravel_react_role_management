import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import Navbar from './Navbar';

const Dashboard: React.FC = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await authService.getDashboard();
        setDashboardData(data);
      } catch (error) {
        console.error('Error fetching dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  const renderAdminDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        <p className="text-3xl font-bold text-indigo-600">{dashboardData?.stats?.total_users || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Roles</h3>
        <p className="text-3xl font-bold text-green-600">{dashboardData?.stats?.total_roles || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Permissions</h3>
        <p className="text-3xl font-bold text-purple-600">{dashboardData?.stats?.total_permissions || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">System Status</h3>
        <p className="text-2xl font-bold text-green-600">Active</p>
      </div>
    </div>
  );

  const renderModeratorDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Total Users</h3>
        <p className="text-3xl font-bold text-indigo-600">{dashboardData?.stats?.total_users || 0}</p>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900">Your Role</h3>
        <p className="text-2xl font-bold text-purple-600">Moderator</p>
      </div>
    </div>
  );

  const renderUserDashboard = () => (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Welcome, {user?.name}!</h3>
      <p className="text-gray-600 mb-4">{dashboardData?.stats?.welcome_message}</p>
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 mb-2">Your Profile</h4>
        <p><span className="font-medium">Email:</span> {dashboardData?.stats?.profile?.email}</p>
        <p><span className="font-medium">Role:</span> {user?.roles?.[0]?.name || 'User'}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-2 text-gray-600">
              Welcome back, {user?.name}! You are logged in as{' '}
              <span className="font-semibold text-indigo-600">
                {user?.roles?.[0]?.name || 'User'}
              </span>
            </p>
          </div>

          {user?.roles?.[0]?.name === 'admin' && renderAdminDashboard()}
          {user?.roles?.[0]?.name === 'moderator' && renderModeratorDashboard()}
          {user?.roles?.[0]?.name === 'user' && renderUserDashboard()}

          {/* Recent Users (Admin and Moderator only) */}
          {(user?.roles?.[0]?.name === 'admin' || user?.roles?.[0]?.name === 'moderator') && (
            <div className="mt-8 bg-white rounded-lg shadow">
              <div className="px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Recent Users</h3>
              </div>
              <div className="p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Name
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Role
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {dashboardData?.stats?.recent_users?.map((user: any, index: number) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {user.name}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.email}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {user.roles?.[0]?.name || 'User'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;