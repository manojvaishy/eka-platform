import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Sparkles, Phone, Lock, CheckCircle } from 'lucide-react';
import { AppContext } from '../App';

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentUser, users } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    const newOtp = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(newOtp);
    setOtp('');
    setOtpError('');
    setStep('otp');
    startResendTimer();
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp === generatedOtp) {
      setOtpError('');
      setIsAuthenticated(true);
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const userData = localStorage.getItem('userData');
      if (!onboardingComplete || !userData) {
        navigate('/onboarding');
      } else {
        const savedUser = JSON.parse(userData);
        setCurrentUser(savedUser);
        navigate('/dashboard');
      }
    } else {
      setOtpError('Galat OTP hai! Dobara try karo.');
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
              {/* OTP Display Box */}
              <div className="mb-5 p-4 bg-green-50 border-2 border-green-300 rounded-xl text-center">
                <p className="text-sm text-green-700 mb-1">✅ OTP sent to <strong>{phone}</strong></p>
                <p className="text-sm text-green-600 mb-2">Your demo OTP is:</p>
                <div className="text-4xl font-bold tracking-widest text-green-700 bg-white rounded-lg py-3 px-4 border-2 border-green-200 inline-block">
                  {generatedOtp}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => { setOtp(e.target.value); setOtpError(''); }}
                  placeholder="______"
                  maxLength="6"
                  className={`input text-center text-2xl tracking-widest ${otpError ? 'border-red-400' : ''}`}
                  required
                />
                {otpError && <p className="text-red-500 text-sm mt-2">{otpError}</p>}
                <div className="flex justify-between items-center mt-2">
                  <button type="button" onClick={() => setStep('phone')} className="text-primary-600 text-sm underline">
                    Number change karo
                  </button>
                  {resendTimer > 0 ? (
                    <span className="text-gray-500 text-sm">Resend in {resendTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleSendOTP} className="text-primary-600 text-sm font-semibold underline">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
              <button type="submit" className="btn-primary w-full">
                Verify & Login
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
