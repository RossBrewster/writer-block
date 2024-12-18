import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signUp, confirmSignUp } from 'aws-amplify/auth'
import BorderBox from '../components/BorderBox'

const SignUp: React.FC = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [accountType, setAccountType] = useState<string>('Student')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false)
  const [confirmationCode, setConfirmationCode] = useState<string>('')

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.')
      return
    }

    try {
      const { nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            'custom:accountType': accountType // Store account type as a custom attribute
          },
          autoSignIn: {
            authFlowType: 'USER_AUTH'
          }
        }
      })

      if (nextStep.signUpStep === 'CONFIRM_SIGN_UP') {
        setShowConfirmation(true)
        setErrorMessage('')
      } else if (nextStep.signUpStep === 'DONE') {
        navigate(`/confirm-email?email=${encodeURIComponent(email)}`)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during sign up')
    }
  }

  const handleConfirmSignUp = async () => {
    try {
      const { nextStep } = await confirmSignUp({
        username: email,
        confirmationCode
      })

      if (nextStep.signUpStep === 'DONE') {
        navigate(`/confirm-email?email=${encodeURIComponent(email)}`)
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'An error occurred during confirmation')
    }
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          {showConfirmation ? 'Confirm Sign Up' : 'Sign Up'}
        </h1>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
            {errorMessage}
          </div>
        )}

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            if (showConfirmation) {
              handleConfirmSignUp()
            } else {
              handleSignUp()
            }
          }}
        >
          {!showConfirmation ? (
            <>
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
            </>
          ) : (
            <div className="mb-6">
              <label htmlFor="confirmation-code" className="block text-gray-300 font-medium mb-2">
                Confirmation Code
              </label>
              <input 
                type="text" 
                id="confirmation-code" 
                className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                          text-white placeholder-gray-500
                          focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
                placeholder="Enter confirmation code" 
                value={confirmationCode}
                onChange={(e) => setConfirmationCode(e.target.value)}
                required 
              />
              <p className="mt-2 text-sm text-gray-400">
                Please check your email for the confirmation code.
              </p>
            </div>
          )}

          <div className="mt-8">
            <BorderBox 
              buttonText={showConfirmation ? "Confirm" : "Sign Up"}
              onClick={showConfirmation ? handleConfirmSignUp : handleSignUp}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp