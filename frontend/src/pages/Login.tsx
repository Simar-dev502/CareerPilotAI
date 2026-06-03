import { useForm } from 'react-hook-form'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginForm) => {
    try {
      await login(data.email, data.password)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Login failed. Check your credentials.')
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="text-3xl font-semibold">CareerPilot AI</h1>
        <p className="mt-2 text-slate-400">Log in to manage your career toolkit.</p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">Email</span>
            <input
              {...register('email')}
              type="email"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              required
            />
          </label>
          <label className="block">
            <span className="text-slate-300">Password</span>
            <input
              {...register('password')}
              type="password"
              className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
              required
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-slate-400">
          New here?{' '}
          <Link to="/register" className="text-cyan-300 hover:text-cyan-100">
            Create account
          </Link>
        </p>
      </div>
    </div>
  )
}
