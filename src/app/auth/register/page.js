'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Input from '@/components/ui/Input'
import LoadingButton from '@/components/ui/LoadingButton'
import { Mail, Lock, User, AlertCircle, CheckCircle, Shield } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters')
      return
    }

    setLoading(true)

    try {
      const { confirmPassword, ...registerData } = formData
      await register(registerData)
      router.push('/')
    } catch (err) {
      setError(err.message || 'Failed to create account')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const passwordStrength = () => {
    const { password } = formData
    if (!password) return null
    
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
    }

    return checks
  }

  const strength = passwordStrength()

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-display font-bold inline-block hover:opacity-70 transition-opacity">
            SPORT
          </Link>
          <h2 className="mt-8 text-heading-xl md:text-display-sm font-medium">Create Your Account</h2>
          <p className="mt-3 text-body text-neutral-600">
            Join thousands of athletes and start your performance journey
          </p>
          
          {/* Trust Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-body-sm text-neutral-500">
            <Shield className="w-4 h-4" />
            <span>Your data is protected and secure</span>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded p-4 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-body-sm text-red-800">{error}</p>
          </div>
        )}

        {/* Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-body-sm font-medium text-neutral-700 mb-2">
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input"
                  placeholder="John"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-body-sm font-medium text-neutral-700 mb-2">
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-body-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="input pl-12"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-body-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="input pl-12"
                  placeholder="••••••••"
                />
              </div>

              {/* Password Strength Indicator */}
              {strength && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-body-sm">
                    {strength.length ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />}
                    <span className={strength.length ? 'text-green-600' : 'text-neutral-500'}>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm">
                    {strength.uppercase && strength.lowercase ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />}
                    <span className={strength.uppercase && strength.lowercase ? 'text-green-600' : 'text-neutral-500'}>Mixed case letters</span>
                  </div>
                  <div className="flex items-center gap-2 text-body-sm">
                    {strength.number ? <CheckCircle className="w-4 h-4 text-green-600" /> : <div className="w-4 h-4 rounded-full border-2 border-neutral-300" />}
                    <span className={strength.number ? 'text-green-600' : 'text-neutral-500'}>Contains a number</span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-body-sm font-medium text-neutral-700 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="input pl-12"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-start">
            <input
              id="terms"
              name="terms"
              type="checkbox"
              required
              className="h-4 w-4 mt-1 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-body-sm text-neutral-700">
              I agree to the{' '}
              <Link href="/terms" className="font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link href="/privacy" className="font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
                Privacy Policy
              </Link>
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Sign In Link */}
          <p className="text-center text-body-sm text-neutral-600">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
