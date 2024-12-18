import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import BorderBox from '../components/BorderBox'

const ResetPassword: React.FC = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [newPassword, setNewPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false)
  
  const email = searchParams.get('email') || ''
  const token = searchParams.get('token') || ''

  useEffect(() => {
    if (!email || !token) {
      setErrorMessage('Invalid or expired password reset link.')
    }
  }, [email, token])

  const handleResetPassword = () => {
    if (newPassword.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.')
      return
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    // Here you would handle the password reset logic with the token
    console.log('Resetting password for:', email)
    console.log('Using token:', token)
    
    setErrorMessage('')
    setIsSuccessful(true)

    // Redirect to sign in page after 3 seconds
    setTimeout(() => {
      navigate('/sign-in')
    }, 3000)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Reset Password</h1>
        
        <p className="text-gray-300 text-center mb-8">
          Enter your new password below.
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
            {errorMessage}
          </div>
        )}

        {isSuccessful ? (
          <div className="mb-6 p-3 bg-green-500 bg-opacity-10 border border-green-500 rounded text-green-500">
            Password successfully reset! Redirecting you to sign in...
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleResetPassword()
            }}
          >
            <div className="mb-6">
              <label htmlFor="new-password" className="block text-gray-300 font-medium mb-2">
                New Password
              </label>
              <input 
                type="password" 
                id="new-password" 
                className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                          text-white placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
                placeholder="Enter your new password" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required 
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirm-password" className="block text-gray-300 font-medium mb-2">
                Confirm New Password
              </label>
              <input 
                type="password" 
                id="confirm-password" 
                className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                          text-white placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
                placeholder="Confirm your new password" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required 
              />
            </div>

            <div className="mt-8">
              <BorderBox 
                buttonText="Reset Password" 
                onClick={handleResetPassword} 
              />
            </div>
          </form>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => navigate('/sign-in')}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResetPassword