import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface ResumeForm {
  role: string
  skills: string
  file: FileList
}

export default function ResumeAnalyzer() {
  const { register, handleSubmit, reset } = useForm<ResumeForm>()
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: ResumeForm) => {
    const file = data.file?.[0]
    if (!file) {
      return
    }
    const formData = new FormData()
    formData.append('file', file)
    formData.append('role', data.role)
    formData.append('skills', data.skills)

    setLoading(true)
    try {
      const response = await api.post('/api/resume/analyze', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setResult(response.data)
      reset()
    } catch (error) {
      console.error(error)
      alert('Failed to analyze resume. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">ATS Resume Analyzer</h1>
          <p className="mt-3 text-slate-400">Upload your resume for instant ATS scoring, keyword analysis, and improvement tips.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <label className="block">
            <span className="text-slate-300">Role</span>
            <input {...register('role')} type="text" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="Frontend Developer" />
          </label>
          <label className="block">
            <span className="text-slate-300">Skills</span>
            <input {...register('skills')} type="text" className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400" placeholder="React, Node.js, AWS" />
          </label>
          <label className="block">
            <span className="text-slate-300">Resume PDF</span>
            <input {...register('file')} type="file" accept="application/pdf" className="mt-2 w-full text-slate-100" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {loading ? 'Analyzing...' : 'Analyze Resume'}
          </button>
        </form>

        {result && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Analysis Results</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <h3 className="text-sm uppercase tracking-[0.2em] text-cyan-300">ATS Score</h3>
                <p className="mt-3 text-4xl font-bold text-white">{result.ats_score}/100</p>
              </div>
              <div className="space-y-4">
                <div className="rounded-2xl bg-slate-950/60 p-4">
                  <h3 className="font-semibold">Missing Skills</h3>
                  <p className="mt-2 text-slate-400">{result.missing_skills.length ? result.missing_skills.join(', ') : 'No key gaps found.'}</p>
                </div>
                <div className="rounded-2xl bg-slate-950/60 p-4">
                  <h3 className="font-semibold">Weak Sections</h3>
                  <p className="mt-2 text-slate-400">{result.weak_sections.length ? result.weak_sections.join(', ') : 'Resume sections look balanced.'}</p>
                </div>
              </div>
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <h3 className="font-semibold">Suggestions</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-slate-400">
                  {result.suggestions.map((suggestion: string, index: number) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-slate-950/60 p-4">
                <h3 className="font-semibold">Summary</h3>
                <p className="mt-3 text-slate-400">{result.summary}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
