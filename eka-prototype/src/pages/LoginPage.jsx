import { useState, useContext, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Lock } from 'lucide-react';
import { AppContext } from '../App';
import EkaLogo from '../components/EkaLogo';
import { auth } from '../firebase';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';

function LoginPage() {
  const navigate = useNavigate();
  const { setIsAuthenticated, setCurrentUser } = useContext(AppContext);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const confirmationRef = useRef(null);
  const recaptchaRef = useRef(null);

  useEffect(() => {
    // Setup invisible recaptcha
    if (!recaptchaRef.current) {
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible',
      });
    }
    return () => {
      if (recaptchaRef.current) {
        recaptchaRef.current.clear();
        recaptchaRef.current = null;
      }
    };
  }, []);

  const startResendTimer = () => {
    setResendTimer(30);
    const interval = setInterval(() => {
      setResendTimer(prev => {
        if (prev <= 1) { clearInterval(interval); return 0; }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const phoneNumber = `+91${phone}`;
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current);
      confirmationRef.current = confirmation;
      setStep('otp');
      startResendTimer();
    } catch (err) {
      console.error(err);
      setError('OTP bhejne mein problem aayi. Dobara try karo.');
      // Reset recaptcha on error
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
    }
    setLoading(false);
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await confirmationRef.current.confirm(otp);
      setIsAuthenticated(true);
      const onboardingComplete = localStorage.getItem('onboardingComplete');
      const userData = localStorage.getItem('userData');
      if (!onboardingComplete || !userData) {
        navigate('/onboarding');
      } else {
        setCurrentUser(JSON.parse(userData));
        navigate('/dashboard');
      }
    } catch (err) {
      console.error(err);
      setError('OTP galat hai. Dobara check karo.');
    }
    setLoading(false);
  };

  const handleResend = async () => {
    setError('');
    setLoading(true);
    try {
      const phoneNumber = `+91${phone}`;
      recaptchaRef.current = new RecaptchaVerifier(auth, 'recaptcha-container', { size: 'invisible' });
      const confirmation = await signInWithPhoneNumber(auth, phoneNumber, recaptchaRef.current);
      confirmationRef.current = confirmation;
      startResendTimer();
    } catch (err) {
      setError('Resend mein problem aayi.');
    }
    setLoading(false);
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
      <div id="recaptcha-container"></div>

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
                <p className="text-sm text-gray-500 mt-2">Aapke number pe real OTP aayega</p>
              </div>
              {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
              <button
                type="submit"
                disabled={phone.length !== 10 || loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Bhej raha hoon...' : 'Send OTP'}
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
                    if (val.length <= 6) { setOtp(val); setError(''); }
                  }}
                  placeholder="• • • • • •"
                  maxLength="6"
                  className="input text-center text-2xl tracking-widest"
                  required
                />
                {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
                <div className="flex justify-between items-center mt-2">
                  <button type="button" onClick={() => setStep('phone')} className="text-primary-600 text-sm underline">
                    Number change karo
                  </button>
                  {resendTimer > 0 ? (
                    <span className="text-gray-500 text-sm">Resend in {resendTimer}s</span>
                  ) : (
                    <button type="button" onClick={handleResend} className="text-primary-600 text-sm font-semibold underline">
                      Resend OTP
                    </button>
                  )}
                </div>
              </div>
              <button
                type="submit"
                disabled={otp.length !== 6 || loading}
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Verify ho raha hai...' : 'Verify & Login'}
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
