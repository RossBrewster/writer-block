import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BorderBox from '../components/BorderBox'

interface UserProfile {
  email: string
  name: string
  accountType: 'Student' | 'Teacher' | 'Admin'
  bio: string
  notifications: boolean
}

const Profile: React.FC = () => {
  const navigate = useNavigate()
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage] = useState('')
  
  // This would normally come from your auth/state management system
  const [profile, setProfile] = useState<UserProfile>({
    email: 'user@example.com',
    name: 'John Doe',
    accountType: 'Student',
    bio: 'A passionate learner and writer.',
    notifications: true
  })

  const handleUpdateProfile = () => {
    // Here you would handle the profile update logic
    console.log('Updating profile:', profile)
    setSuccessMessage('Profile updated successfully!')
    setIsEditing(false)
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('')
    }, 3000)
  }

  const handleSignOut = () => {
    // Handle sign out logic here
    navigate('/sign-in')
  }

  return (
    <div className="min-h-screen w-full bg-gray-900">
      <div className="max-w-4xl mx-auto py-12 px-4">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-gray-300 hover:text-white transition-colors duration-200"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>

          {successMessage && (
            <div className="mb-6 p-3 bg-green-500 bg-opacity-10 border border-green-500 rounded text-green-500">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
              {errorMessage}
            </div>
          )}

          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleUpdateProfile()
            }}
          >
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="block text-gray-300 font-medium mb-2">Email</label>
                <input 
                  type="email"
                  className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                            text-white placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  value={profile.email}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Name</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                            text-white placeholder-gray-500
                            focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  value={profile.name}
                  onChange={(e) => setProfile({...profile, name: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Account Type</label>
                <input 
                  type="text"
                  className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                            text-white placeholder-gray-500"
                  value={profile.accountType}
                  disabled
                />
              </div>

              <div>
                <label className="block text-gray-300 font-medium mb-2">Bio</label>
                <textarea 
                  className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                            text-white placeholder-gray-500 h-32
                            focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="flex items-center text-gray-300">
                  <input
                    type="checkbox"
                    className="mr-2"
                    checked={profile.notifications}
                    onChange={(e) => setProfile({...profile, notifications: e.target.checked})}
                    disabled={!isEditing}
                  />
                  Receive email notifications
                </label>
              </div>
            </div>

            {isEditing && (
              <div className="mb-6">
                <BorderBox 
                  buttonText="Save Changes" 
                  onClick={handleUpdateProfile} 
                />
              </div>
            )}
          </form>

          <div className="border-t border-gray-700 pt-6 mt-6">
            <h2 className="text-xl font-bold text-white mb-4">Account Settings</h2>
            <div className="space-y-4">
              <button
                onClick={() => navigate('/reset-password')}
                className="text-gray-300 hover:text-white transition-colors duration-200 block"
              >
                Change Password
              </button>
              <button
                onClick={handleSignOut}
                className="text-red-400 hover:text-red-300 transition-colors duration-200 block"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile