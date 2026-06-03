import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface LeetCodeForm {
  username: string
}

export default function LeetCodeTracker() {
  const { register, handleSubmit } = useForm<LeetCodeForm>()
  const [stats, setStats] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LeetCodeForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/leetcode/stats', { username: data.username })
      setStats(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to retrieve LeetCode stats. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">LeetCode Tracker</h1>
          <p className="mt-3 text-slate-400">Track solved problems, rating, streaks, and topic progress.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">LeetCode Username</span>
            <input {...register('username')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Fetching…' : 'Fetch Stats'}
          </button>
        </form>

        {stats && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">LeetCode Stats</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Solved</p>
                <p className="mt-2 text-3xl font-semibold">{stats.solved}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Rating</p>
                <p className="mt-2 text-3xl font-semibold">{stats.rating}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Streak</p>
                <p className="mt-2 text-3xl font-semibold">{stats.streak}</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl bg-slate-950/70 p-4">
              <h3 className="font-semibold">Topic Progress</h3>
              <pre className="mt-2 text-slate-300">{JSON.stringify(stats.topic_progress, null, 2)}</pre>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
