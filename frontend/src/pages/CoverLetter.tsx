import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface CoverLetterForm {
  companyName: string
  role: string
  resumeText: string
}

export default function CoverLetter() {
  const { register, handleSubmit } = useForm<CoverLetterForm>()
  const [coverLetter, setCoverLetter] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: CoverLetterForm) => {
    setLoading(true)
    try {
      const response = await api.post('/api/cover-letter/generate', {
        company_name: data.companyName,
        role: data.role,
        resume_text: data.resumeText,
      })
      setCoverLetter(response.data.cover_letter)
    } catch (error) {
      console.error(error)
      alert('Unable to generate cover letter. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Cover Letter Generator</h1>
          <p className="mt-3 text-slate-400">Create a professional cover letter tailored to the company and role.</p>
        </div>

        <form className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl" onSubmit={handleSubmit(onSubmit)}>
          <label className="block">
            <span className="text-slate-300">Company Name</span>
            <input {...register('companyName')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </label>
          <label className="block">
            <span className="text-slate-300">Role</span>
            <input {...register('role')} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" required />
          </label>
          <label className="block">
            <span className="text-slate-300">Resume Summary</span>
            <textarea {...register('resumeText')} rows={6} className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white" placeholder="Paste your resume summary or relevant experience here." />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400">
            {loading ? 'Generating…' : 'Generate Cover Letter'}
          </button>
        </form>

        {coverLetter && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Generated Cover Letter</h2>
            <pre className="mt-4 whitespace-pre-wrap rounded-2xl border border-slate-700 bg-slate-950 p-6 text-slate-100">{coverLetter}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
