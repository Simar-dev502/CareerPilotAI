import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface LinkedInForm {
  profileUrl: string
}

export default function LinkedInAnalyzer() {
  const { register, handleSubmit } = useForm<LinkedInForm>()
  const [report, setReport] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: LinkedInForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/linkedin/analyze', { profile_url: data.profileUrl })
      setReport(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to analyze LinkedIn profile. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">LinkedIn Profile Analyzer</h1>
          <p className="mt-3 text-slate-400">Review headline, summary, skills, and activity to improve your profile.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">LinkedIn Profile URL</span>
            <input {...register('profileUrl')} type="url" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="https://www.linkedin.com/in/username" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Analyzing…' : 'Analyze Profile'}
          </button>
        </form>

        {report && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Profile Insights</h2>
            <p className="mt-4 text-slate-300">Headline: {report.headline || 'Not available'}</p>
            <p className="mt-2 text-slate-300">Summary: {report.summary || 'Not available'}</p>
            <div className="mt-4 rounded-2xl bg-slate-950/70 p-4">
              <h3 className="font-semibold">Suggested Skills</h3>
              <p className="mt-2 text-slate-400">{report.skills?.join(', ') || 'No recommendations available.'}</p>
            </div>
            <div className="mt-4 rounded-2xl bg-slate-950/70 p-4">
              <h3 className="font-semibold">Activity Insights</h3>
              <ul className="mt-2 list-disc space-y-2 pl-5 text-slate-400">
                {report.activity_insights?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
