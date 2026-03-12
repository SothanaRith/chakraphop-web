'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import Input from '@/components/ui/Input'
import LoadingButton from '@/components/ui/LoadingButton'
import { Mail, Lock, AlertCircle, Shield } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(formData)
      router.push('/')
    } catch (err) {
      setError(err.message || 'Invalid email or password')
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-3xl font-display font-bold inline-block hover:opacity-70 transition-opacity">
            SPORT
          </Link>
          <h2 className="mt-8 text-heading-xl md:text-display-sm font-medium">Welcome Back</h2>
          <p className="mt-3 text-body text-neutral-600">
            Sign in to access your account and continue your athletic journey
          </p>
          
          {/* Trust Badge */}
          <div className="mt-4 flex items-center justify-center gap-2 text-body-sm text-neutral-500">
            <Shield className="w-4 h-4" />
            <span>Secure login with SSL encryption</span>
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
        <form className="mt-8 space-y-6 bg-white rounded-lg p-8 shadow-sm" onSubmit={handleSubmit}>
          <div className="space-y-5">
            {/* Email */}
            <Input
              id="email"
              name="email"
              type="email"
              label="Email Address"
              icon={Mail}
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
            />

            {/* Password */}
            <Input
              id="password"
              name="password"
              type="password"
              label="Password"
              icon={Lock}
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-neutral-900 focus:ring-neutral-900 border-neutral-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-body-sm text-neutral-700">
                Remember me
              </label>
            </div>

            <Link href="/auth/forgot-password" className="text-body-sm font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <LoadingButton
            type="submit"
            loading={loading}
            className="w-full"
          >
            Sign In
          </LoadingButton>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-neutral-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-neutral-50 text-neutral-500">Or continue with</span>
            </div>
          </div>

          {/* Google Sign In */}
          <button
            type="button"
            className="btn btn-secondary w-full flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Sign in with Google
          </button>

          {/* Sign Up Link */}
          <p className="text-center text-body-sm text-neutral-600">
            Don't have an account?{' '}
            <Link href="/auth/register" className="font-medium text-neutral-900 hover:text-neutral-600 transition-colors">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
