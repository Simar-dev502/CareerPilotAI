import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface InterviewForm {
  role: string
  experienceLevel: string
  skills: string
}

export default function InterviewPrep() {
  const { register, handleSubmit } = useForm<InterviewForm>()
  const [questions, setQuestions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: InterviewForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/interview/questions', {
        role: data.role,
        experience_level: data.experienceLevel,
        skills: data.skills.split(',').map((item) => item.trim()),
      })
      setQuestions(response.data.questions)
    } catch (error) {
      console.error(error)
      alert('Unable to generate questions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">AI Interview Prep</h1>
          <p className="mt-3 text-slate-400">Generate interview questions tailored to your role, experience, and skill set.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">Role</span>
            <input {...register('role')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="AI Engineer" required />
          </label>
          <label className="block">
            <span className="text-slate-300">Experience Level</span>
            <input {...register('experienceLevel')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Mid-level" required />
          </label>
          <label className="block">
            <span className="text-slate-300">Skills</span>
            <input {...register('skills')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Python, ML, TensorFlow" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Generating…' : 'Generate Questions'}
          </button>
        </form>

        {questions.length > 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Generated Questions</h2>
            <div className="mt-6 space-y-4">
              {questions.map((question, index) => (
                <div key={index} className="rounded-2xl bg-slate-950/70 p-4">
                  <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">{question.category}</p>
                  <p className="mt-2 text-slate-100">{question.question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
