import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Phone, Lock } from 'lucide-react';
import { AppContext } from '../App';

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentUser, users } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'

  const handleSendOTP = (e) => {
    e.preventDefault();
    // Simulate OTP send
    setStep('otp');
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    // Simulate OTP verification - any 6 digits work
    if (otp.length === 6) {
      setIsAuthenticated(true);
      
      // IMPORTANT: Check if user has completed onboarding
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const userData = localStorage.getItem('userData');
      
      // If no onboarding data OR onboarding not complete, go to onboarding
      if (!onboardingComplete || !userData) {
        console.log('New user - redirecting to onboarding');
        navigate('/onboarding');
      } else {
        console.log('Existing user - redirecting to dashboard');
        // Load user data and set as current user
        const savedUser = JSON.parse(userData);
        setCurrentUser(savedUser);
        navigate('/dashboard');
      }
    }
  };

  const handleClearData = () => {
    if (confirm('Clear all data and start fresh? This will reset everything.')) {
      localStorage.clear();
      alert('All data cleared! You can now test onboarding as a new user.');
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100 -z-10"></div>
      
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-10 h-10 text-primary-500" />
            <span className="text-3xl font-display font-bold gradient-text">Eka</span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Login to continue your journey</p>
        </div>

        {/* Login Card */}
        <div className="card p-8">
          {step === 'phone' ? (
            <form onSubmit={handleSendOTP}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="input"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">We'll send you an OTP to verify</p>
              </div>
              <button type="submit" className="btn-primary w-full">
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  maxLength="6"
                  className="input text-center text-2xl tracking-widest"
                  required
                />
                <p className="text-sm text-gray-500 mt-2">
                  OTP sent to {phone}
                  <button 
                    type="button"
                    onClick={() => setStep('phone')}
                    className="text-primary-600 ml-2 underline"
                  >
                    Change
                  </button>
                </p>
              </div>
              <button type="submit" className="btn-primary w-full">
                Verify & Login
              </button>
              <button 
                type="button"
                className="w-full mt-3 text-primary-600 font-semibold"
              >
                Resend OTP
              </button>
            </form>
          )}
        </div>

        {/* Demo Hint */}
        <div className="mt-6 p-4 bg-yellow-50 border-2 border-yellow-200 rounded-lg">
          <p className="text-sm text-yellow-800 text-center mb-3">
            <strong>Demo Mode:</strong> Enter any phone number and any 6-digit OTP to login
          </p>
          <button
            onClick={handleClearData}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm font-semibold"
          >
            🔄 Clear Data & Test as New User
          </button>
        </div>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{' '}
          <Link to="/login" className="text-primary-600 font-semibold">
            Sign up - It's Free!
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
