import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface RoadmapForm {
  careerGoal: string
}

export default function RoadmapGenerator() {
  const { register, handleSubmit } = useForm<RoadmapForm>()
  const [roadmap, setRoadmap] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: RoadmapForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/roadmap/generate', { career_goal: data.careerGoal })
      setRoadmap(response.data)
    } catch (error) {
      console.error(error)
      alert('Unable to generate roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Learning Roadmap Generator</h1>
          <p className="mt-3 text-slate-400">Build a week-by-week plan for your next career milestone.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">Career Goal</span>
            <input {...register('careerGoal')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="AI Engineer" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Generating…' : 'Generate Roadmap'}
          </button>
        </form>

        {roadmap && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Roadmap for {roadmap.career_goal}</h2>
            <div className="mt-6 space-y-4">
              {roadmap.plan?.map((item: any, index: number) => (
                <div key={index} className="rounded-2xl bg-slate-950/70 p-5">
                  <h3 className="text-lg font-semibold">Week {item.week}: {item.focus}</h3>
                  <p className="mt-2 text-slate-400">{item.milestone}</p>
                  <p className="mt-3 text-slate-300">Resources: {item.resources?.join(', ')}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
