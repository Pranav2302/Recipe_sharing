import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { userService } from '../services/api';
import { motion } from "motion/react";
import { UserIcon } from "lucide-react";

export default function Profile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await userService.getProfile();
        setProfile(response.data);
      } catch (err) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile information');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-blue-100 border-t-blue-400 rounded-full animate-spin-slow"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-6 rounded-lg">
        {error}
      </div>
    );
  }

  // Define a default profile image URL
  const defaultProfileImage = "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1180&q=80";

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
        My Profile
      </h1>
      
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl opacity-20 blur-xl"></div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 relative z-10"
        >
          <div className="flex flex-col sm:flex-row items-center mb-6">
            <div className="w-32 h-32 mb-4 sm:mb-0 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-md relative bg-gray-100 dark:bg-gray-700">
              {profile?.profilePicture && profile.profilePicture !== 'default-profile.jpg' ? (
                <img 
                  src={profile.profilePicture} 
                  alt={profile.username}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = defaultProfileImage;
                  }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <UserIcon size={48} className="text-gray-400" />
                </div>
              )}
            </div>
            
            <div className="flex-1 text-center sm:text-left sm:ml-6">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                {profile?.username}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-2">
                {profile?.email}
              </p>
              <div className="text-sm text-blue-600 dark:text-blue-400">
                Member since {new Date(profile?.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all">
              Edit Profile
            </button>
          </div>
        </motion.div>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
          My Recipes
        </h3>
        
        <div className="text-center py-10 text-gray-500">
          <p>You haven't created any recipes yet.</p>
          <button 
            onClick={() => window.location.href = '/create-recipe'}
            className="mt-4 bg-blue-100 text-blue-600 hover:bg-blue-200 px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Create Your First Recipe
          </button>
        </div>
      </div>
    </div>
  );
}