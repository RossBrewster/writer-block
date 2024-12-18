import { useState } from 'react'
import BorderBox from '../components/BorderBox'

const EmailConfirmation: React.FC = () => {
  const [confirmationCode, setConfirmationCode] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const email = '' // This should be passed as a prop or from a route param in actual implementation

  const handleResendCode = () => {
    // Handle resending confirmation code logic
    console.log('Resending code to:', email)
    alert('New confirmation code sent!')
  }

  const handleConfirmEmail = () => {
    if (confirmationCode.length !== 6) {
      setErrorMessage('Please enter a valid 6-digit confirmation code.')
      return
    }
    
    // Here you can handle the email confirmation logic
    console.log('Confirming email with code:', confirmationCode)
    setErrorMessage('')
    alert('Confirmation successful!')
  }

  return (
    <div className="min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white bg-opacity-10 backdrop-blur-sm p-8 rounded-lg w-full max-w-md relative z-40">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Confirm Your Email</h1>
        
        <p className="text-gray-300 text-center mb-8">
          We've sent a confirmation code to your email address. 
          Please enter the code below to verify your account.
        </p>

        {errorMessage && (
          <div className="mb-6 p-3 bg-red-500 bg-opacity-10 border border-red-500 rounded text-red-500">
            {errorMessage}
          </div>
        )}

        <form 
          onSubmit={(e) => {
            e.preventDefault()
            handleConfirmEmail()
          }}
        >
          <div className="mb-6">
            <label htmlFor="confirmation-code" className="block text-gray-300 font-medium mb-2">
              Confirmation Code
            </label>
            <input 
              type="text" 
              id="confirmation-code" 
              className="w-full p-3 bg-white bg-opacity-5 border border-gray-700 rounded 
                        text-white placeholder-gray-500 text-center text-2xl tracking-wide
                        focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent" 
              placeholder="000000" 
              value={confirmationCode}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '')
                if (value.length <= 6) {
                  setConfirmationCode(value)
                }
              }}
              maxLength={6}
              required 
            />
          </div>

          <div className="mt-8">
            <BorderBox 
              buttonText="Confirm Email" 
              onClick={handleConfirmEmail} 
            />
          </div>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={handleResendCode}
            className="text-gray-300 hover:text-white transition-colors duration-200"
          >
            Didn't receive a code? Click here to resend
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

export default EmailConfirmation