import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface GitHubForm {
  username: string
}

export default function GitHubAnalyzer() {
  const { register, handleSubmit } = useForm<GitHubForm>()
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: GitHubForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/github/analyze', { username: data.username })
      setReport(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to analyze GitHub profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">GitHub Profile Analyzer</h1>
          <p className="mt-3 text-slate-400">Analyze repository activity, languages, and developer score.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">GitHub Username</span>
            <input {...register('username')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Analyzing…' : 'Analyze GitHub'}
          </button>
        </form>

        {report && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">GitHub Analysis</h2>
            <p className="mt-4 text-slate-300">Developer score: {report.developer_score}</p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <h3 className="font-semibold">Top Languages</h3>
                <p className="mt-2 text-slate-400">{report.top_languages.join(', ')}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/70 p-4">
                <h3 className="font-semibold">Repo Stats</h3>
                <p className="mt-2 text-slate-400">Repos: {report.total_repos} • Stars: {report.total_stars}</p>
              </div>
            </div>
            <div className="mt-6 space-y-4">
              {report.repos?.map((repo: any, index: number) => (
                <div key={index} className="rounded-2xl bg-slate-950/70 p-4">
                  <a href={repo.url} target="_blank" rel="noreferrer" className="text-lg font-semibold text-cyan-300">
                    {repo.name}
                  </a>
                  <p className="mt-1 text-slate-400">{repo.language} • ⭐ {repo.stars}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
