import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentUser } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
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
    setOtp('');
    setStep('otp');
    startResendTimer();
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length === 6) {
      setIsAuthenticated(true);
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const userData = localStorage.getItem('userData');
      if (!onboardingComplete || !userData) {
        navigate('/onboarding');
      } else {
        setCurrentUser(JSON.parse(userData));
        navigate('/dashboard');
      }
    }
  };

  const handleClearData = () => {
    if (confirm('Clear all data and start fresh?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary-100 via-white to-secondary-100 -z-10"></div>

      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center justify-center mb-4">
            <EkaLogo size="lg" />
          </Link>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back!</h1>
          <p className="text-gray-600">Login to continue your journey</p>
        </div>

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
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 10) setPhone(val);
                  }}
                  placeholder="10-digit mobile number"
                  className="input"
                  maxLength={10}
                  required
                />
                <p className="text-sm text-gray-500 mt-2">We'll send you an OTP to verify</p>
              </div>
              <button
                type="submit"
                disabled={phone.length !== 10}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Send OTP
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP}>
              <div className="mb-5 p-4 bg-green-50 border-2 border-green-200 rounded-xl text-center">
                <p className="text-green-700 font-semibold">✅ OTP sent to +91 {phone}</p>
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">
                  <Lock className="w-4 h-4 inline mr-2" />
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => {
                    const val = e.target.value.replace(/\D/g, '');
                    if (val.length <= 6) setOtp(val);
                  }}
                  placeholder="• • • • • •"
                  maxLength="6"
                  className="input text-center text-2xl tracking-widest"
                  required
                />
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
              <button
                type="submit"
                disabled={otp.length !== 6}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Verify & Login
              </button>
            </form>
          )}
        </div>

        <div className="mt-4 text-center">
          <button onClick={handleClearData} className="text-xs text-red-400 hover:text-red-600 transition">
            🔄 Clear Data & Test as New User
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
