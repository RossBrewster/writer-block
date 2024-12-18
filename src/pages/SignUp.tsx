import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BorderBox from '../components/BorderBox'


const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [accountType, setAccountType] = useState<string>('Student')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }
    
    // Here you can handle the sign-up logic
    console.log('Email:', email)
    console.log('Password:', password)
    console.log('Account Type:', accountType)
    setErrorMessage('')
    
    // After successful signup, navigate to the confirmation page
    navigate(`/confirm-email?email=${encodeURIComponent(email)}`)
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Sign Up</h1>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
            {errorMessage}
          </div>
        )}

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSignUp()
          }}
        >
          <div className="mb-6">
            <label htmlFor="email" className="block text-gray-300 font-medium mb-2">Email</label>
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

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-300 font-medium mb-2">Password</label>
            <input 
              type="password" 
              id="password" 
              className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                        text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
              placeholder="Enter your password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirm-password" className="block text-gray-300 font-medium mb-2">
              Confirm Password
            </label>
            <input 
              type="password" 
              id="confirm-password" 
              className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                        text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
              placeholder="Confirm your password" 
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required 
            />
          </div>

          <div className="mb-6">
            <label htmlFor="account-type" className="block text-gray-300 font-medium mb-2">
              Account Type
            </label>
            <select
              id="account-type"
              className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                        text-white placeholder-gray-500
                        focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="Student">Student</option>
              <option value="Teacher">Teacher</option>
              <option value="Admin">Admin</option>
            </select>
          </div>

          <div className="mt-8">
            <BorderBox 
              buttonText="Sign Up" 
              onClick={handleSignUp} 
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp