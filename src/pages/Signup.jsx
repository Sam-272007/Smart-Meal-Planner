import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus, Mail, Lock, AlertCircle, Check } from 'lucide-react';
import { Card, Button, Input } from '../components/ui';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();
  const navigate = useNavigate();

  const passwordRequirements = [
    { text: 'At least 6 characters', met: password.length >= 6 },
    { text: 'Matches confirmation', met: password === confirmPassword && password.length > 0 }
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError('Passwords do not match');
    }
    if (password.length < 6) {
      return setError('Password must be at least 6 characters');
    }
    try {
      setError('');
      setLoading(true);
      await signup(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mb-4">
            <UserPlus className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-secondary-900">Create Account</h2>
          <p className="text-secondary-600 mt-2">Join Smart Meal Planner today</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Email address"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full"
          />

          <Input
            label="Password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full"
          />

          <Input
            label="Confirm password"
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            className="w-full"
          />

          {/* Password requirements */}
          <div className="space-y-2">
            <p className="text-sm font-medium text-secondary-700">Password requirements:</p>
            {passwordRequirements.map((req, index) => (
              <div key={index} className="flex items-center space-x-2 text-sm">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                  req.met ? 'bg-green-100 text-green-600' : 'bg-secondary-100 text-secondary-400'
                }`}>
                  <Check className="w-3 h-3" />
                </div>
                <span className={req.met ? 'text-green-700' : 'text-secondary-600'}>
                  {req.text}
                </span>
              </div>
            ))}
          </div>

          <Button
            type="submit"
            disabled={loading || !passwordRequirements.every(req => req.met)}
            className="w-full"
            size="lg"
          >
            {loading ? (
              <>
                <LoadingSpinner size={16} />
                <span className="ml-2">Creating account...</span>
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                Create Account
              </>
            )}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-secondary-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-700 transition-colors"
            >
              Sign in
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
}
