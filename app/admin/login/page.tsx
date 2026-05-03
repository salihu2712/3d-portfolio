import { loginAction } from "@/app/actions/content"

interface LoginPageProps {
  searchParams: Promise<{ error?: string }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error } = await searchParams

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-violet-500 bg-clip-text text-transparent">
            CgSalih Admin
          </h1>
          <p className="text-gray-400 text-sm">Enter your password to continue</p>
        </div>

        <form action={loginAction} className="bg-gray-900 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoFocus
              className="w-full bg-gray-800 border border-gray-700 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="Enter admin password"
            />
          </div>

          {error && (
            <p className="text-sm bg-red-950/50 text-red-400 rounded-md px-3 py-2">
              Incorrect password. Try again.
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-medium py-2 rounded-md transition-all duration-200"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
