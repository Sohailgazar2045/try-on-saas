'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authAPI, userAPI } from '@/lib/api';
import { isDemoMode, getDemoUser } from '@/lib/auth';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { User, Mail, Lock, Shield, Save, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  );
}

function ProfileContent() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [isDemo, setIsDemo] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const demo = isDemoMode();
      setIsDemo(demo);

      if (demo) {
        const demoUser = getDemoUser();
        setUser(demoUser);
        setName(demoUser.name);
        setEmail(demoUser.email);
        return;
      }

      try {
        const response = await authAPI.getProfile();
        setUser(response.data.user);
        setName(response.data.user.name || '');
        setEmail(response.data.user.email || '');
      } catch (error) {
        console.error('Failed to load profile:', error);
      }
    };
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemo) {
      toast.error('Sign up to update your profile');
      return;
    }

    setLoading(true);
    
    try {
      await userAPI.updateProfile({ name, email });
      toast.success('Profile updated!');
      setUser({ ...user, name, email });
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isDemo) {
      toast.error('Sign up to change your password');
      return;
    }

    if (!currentPassword || !newPassword) {
      toast.error('Please fill in both password fields');
      return;
    }
    
    setLoading(true);
    try {
      await userAPI.changePassword({ currentPassword, newPassword });
      toast.success('Password changed!');
      setCurrentPassword('');
      setNewPassword('');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Password change failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-surface">
      <Sidebar 
        user={user} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="flex-1 flex flex-col overflow-hidden min-w-0">
        <Header 
          user={user} 
          title="Profile"
          subtitle="Manage your account settings"
          onMenuClick={() => setSidebarOpen(true)}
        />

        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="max-w-2xl mx-auto space-y-8">
            {/* Profile Picture */}
            <div className="card">
              <div className="flex items-center gap-6">
                <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600">
                  <span className="text-2xl font-bold text-white">
                    {(user?.name || user?.email || 'U')[0].toUpperCase()}
                  </span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-foreground">{user?.name || 'User'}</h2>
                  <p className="text-sm text-foreground-tertiary">{user?.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="badge-accent capitalize">{user?.subscription || 'Free'} Plan</span>
                    <span className="badge">{user?.credits || 0} credits</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Profile Info */}
            <div className="card">
              <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-foreground-tertiary" />
                Personal Information
              </h3>
              <form onSubmit={handleUpdateProfile} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">Full name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">Email address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input"
                    placeholder="you@example.com"
                  />
                </div>
                <button type="submit" disabled={loading} className="btn-primary">
                  <Save className="h-4 w-4" />
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </form>
            </div>

            {/* Change Password */}
            <div className="card">
              <h3 className="text-base font-semibold text-foreground mb-6 flex items-center gap-2">
                <Lock className="h-5 w-5 text-foreground-tertiary" />
                Change Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">Current password</label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="input pr-12"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground-secondary"
                    >
                      {showCurrentPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground-secondary mb-2">New password</label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="input pr-12"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground-tertiary hover:text-foreground-secondary"
                    >
                      {showNewPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
                <button type="submit" disabled={loading} className="btn-secondary">
                  <Shield className="h-4 w-4" />
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </form>
            </div>

            {/* Danger Zone */}
            <div className="card border-red-500/20">
              <h3 className="text-base font-semibold text-red-400 mb-2">Danger Zone</h3>
              <p className="text-sm text-foreground-tertiary mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <button className="px-4 py-2 rounded-lg text-sm font-medium text-red-400 bg-red-500/10 hover:bg-red-500/20 transition-colors">
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

