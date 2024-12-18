import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BorderBox from '../components/BorderBox'

const SignIn: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleSignIn = () => {
    // Here you can handle the sign-in logic
    console.log('Email:', email)
    console.log('Password:', password)
    alert('Sign In button clicked!')
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Sign In</h1>

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleSignIn()
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
            <div className="mt-2 text-right">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-gray-300 hover:text-white text-sm transition-colors duration-200"
              >
                Forgot password?
              </button>
            </div>
          </div>

          <div className="mt-8">
            <BorderBox 
              buttonText="Sign In" 
              onClick={handleSignIn} 
            />
          </div>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-300">
            Don't have an account?{' '}
            <button
              onClick={() => navigate('/sign-up')}
              className="text-white hover:text-gray-300 transition-colors duration-200"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn