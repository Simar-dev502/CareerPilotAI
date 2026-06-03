import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface JobsForm {
  resumeText: string
  skills: string
  experienceYears: number
}

export default function JobRecommendations() {
  const { register, handleSubmit } = useForm<JobsForm>({ defaultValues: { experienceYears: 1 } })
  const [results, setResults] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: JobsForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/jobs/recommend', {
        resume_text: data.resumeText,
        skills: data.skills.split(',').map((skill) => skill.trim()),
        experience_years: data.experienceYears,
      })
      setResults(response.data.recommendations)
    } catch (error) {
      console.error(error)
      alert('Unable to fetch job recommendations. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Job Recommendation Engine</h1>
          <p className="mt-3 text-slate-400">Get role suggestions based on your skills, experience, and resume.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">Resume Summary</span>
            <textarea {...register('resumeText')} rows={5} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Brief summary or resume content." />
          </label>
          <label className="block">
            <span className="text-slate-300">Skills</span>
            <input {...register('skills')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="React, Node.js, Python" required />
          </label>
          <label className="block">
            <span className="text-slate-300">Experience (years)</span>
            <input {...register('experienceYears', { valueAsNumber: true })} type="number" min={0} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Finding Roles…' : 'Get Recommendations'}
          </button>
        </form>

        {results.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Recommended Roles</h2>
            <div className="mt-6 space-y-4">
              {results.map((item: any, index: number) => (
                <div key={index} className="rounded-2xl bg-slate-950/70 p-5">
                  <h3 className="text-lg font-semibold">{item.title} @ {item.company}</h3>
                  <p className="mt-2 text-slate-400">Match score: {item.match_score}%</p>
                  <p className="mt-2 text-slate-300">Required: {item.required_skills?.join(', ')}</p>
                  <p className="mt-2 text-slate-300">Missing: {item.missing_skills?.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
