'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Login failed')
      }

      // Check if user is an admin
      if (data.user.role !== 'admin') {
        throw new Error('Access denied: User is not an administrator')
      }

      // Save token & user details
      localStorage.setItem('adminToken', data.token || data.accessToken)
      localStorage.setItem('adminUser', JSON.stringify(data.user))

      // Redirect to dashboard
      router.push('/dashboard')
    } catch (err: any) {
      setError(err.message || 'An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-3xl border border-[#e5bdbe] shadow-sm">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-[#ba0036]">ShowNest Admin</h1>
        <p className="mt-2 text-sm text-[#5c3f41]">Sign in to access control panel</p>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-[#fff8f7] border border-[#e5bdbe] rounded-2xl">
          <p className="text-sm text-[#ba0036]" role="alert">
            {error}
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-[#281718] mb-1">
            Email or Username
          </label>
          <input
            type="text"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@shownest.com"
            disabled={isLoading}
            className="w-full rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm outline-none focus:border-[#ba0036] transition-colors"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#281718] mb-1">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            disabled={isLoading}
            className="w-full rounded-full border border-[#e5bdbe] bg-[#fff8f7] px-4 py-2 text-sm outline-none focus:border-[#ba0036] transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full rounded-full bg-[#ba0036] text-white py-2 text-sm font-semibold hover:bg-[#960029] transition-colors disabled:opacity-50 mt-2"
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
