import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BorderBox from '../components/BorderBox'

const ForgotPassword: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false)

  const handleSubmit = () => {
    if (!email) {
      setErrorMessage('Please enter your email address.')
      return
    }

    // Here you would handle the password reset request
    console.log('Requesting password reset for:', email)
    setErrorMessage('')
    setIsSubmitted(true)

    // After 3 seconds, redirect to the password reset page
    setTimeout(() => {
      navigate(`/reset-password?email=${encodeURIComponent(email)}`)
    }, 3000)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Forgot Password</h1>
        
        <p className="text-gray-300 text-center mb-8">
          Enter your email address and we'll send you instructions to reset your password.
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
            {errorMessage}
          </div>
        )}

        {isSubmitted ? (
          <div className="mb-6 p-3 bg-green-500 bg-opacity-10 border border-green-500 rounded text-green-500">
            Success! Check your email for password reset instructions. 
            Redirecting you shortly...
          </div>
        ) : (
          <form 
            onSubmit={(e) => {
              e.preventDefault()
              handleSubmit()
            }}
          >
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                          text-white placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
                placeholder="Enter your email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>

            <div className="mt-8">
              <BorderBox 
                buttonText="Reset Password" 
                onClick={handleSubmit} 
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

        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            Please check your spam folder if you don't see the email in your inbox.
          </p>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword