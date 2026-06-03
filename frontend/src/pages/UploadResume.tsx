import { useState } from 'react'
import { useForm } from 'react-hook-form'
import api from '../services/api'

interface UploadForm {
  file: FileList
}

export default function UploadResume() {
  const { register, handleSubmit, reset } = useForm<UploadForm>()
  const [uploadUrl, setUploadUrl] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data: UploadForm) => {
    const file = data.file?.[0]
    if (!file) return
    const formData = new FormData()
    formData.append('file', file)

    setLoading(true)
    try {
      const response = await api.post('/api/upload/resume', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      setUploadUrl(response.data.url)
      reset()
    } catch (error) {
      console.error(error)
      alert('Upload failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 px-4 py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <h1 className="text-3xl font-semibold">Secure Resume Upload</h1>
          <p className="mt-3 text-slate-400">Upload your resume to Firebase Storage with secure token-based access.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-6 rounded-3xl border border-white/10 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <label className="block">
            <span className="text-slate-300">Resume PDF</span>
            <input {...register('file')} type="file" accept="application/pdf" className="mt-2 w-full text-slate-100" required />
          </label>
          <button type="submit" disabled={loading} className="w-full rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
            {loading ? 'Uploading…' : 'Upload Resume'}
          </button>
        </form>

        {uploadUrl && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Resume Uploaded</h2>
            <p className="mt-3 text-slate-400">Your resume is securely stored. Use the link below for future applications.</p>
            <a href={uploadUrl} target="_blank" rel="noreferrer" className="mt-4 inline-block rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              View Uploaded Resume
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
