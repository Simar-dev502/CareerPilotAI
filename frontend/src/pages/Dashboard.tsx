import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Dashboard() {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10">
        <header className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">CareerPilot AI</p>
            <h1 className="mt-3 text-4xl font-semibold">Personal Career Assistant</h1>
            <p className="mt-2 max-w-2xl text-slate-400">Track your journey, analyze resumes, upload files securely, and generate AI-driven career guidance.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/resume" className="rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              ATS Analyzer
            </Link>
            <Link to="/upload" className="rounded-2xl border border-slate-700 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-400">
              Upload Resume
            </Link>
            <button
              onClick={logout}
              className="rounded-2xl bg-slate-800 px-5 py-3 text-sm font-semibold text-slate-100 transition hover:bg-slate-700"
            >
              Logout
            </button>
          </div>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Resume Insights</h2>
            <p className="mt-3 text-slate-400">Analyze uploaded PDFs and get instant ATS scoring, skill gaps, and recommendations to optimize your resume.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Interview Prep</h2>
            <p className="mt-3 text-slate-400">Practice curated interview questions and evaluate your responses with AI feedback.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Learning Roadmap</h2>
            <p className="mt-3 text-slate-400">Generate a week-by-week plan with resources and milestones for your career goal.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Cover Letter AI</h2>
            <p className="mt-3 text-slate-400">Create a polished, role-specific cover letter that matches your resume and target company.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Job Match Trends</h2>
            <p className="mt-3 text-slate-400">Receive targeted job recommendations with match scores and missing skill analysis.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Profile Analytics</h2>
            <p className="mt-3 text-slate-400">Analyze GitHub, LinkedIn, and LeetCode profiles to level up your portfolio and visibility.</p>
          </article>
          <article className="rounded-3xl border border-white/10 bg-slate-950/70 p-6 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-semibold">Analytics Dashboard</h2>
            <p className="mt-3 text-slate-400">Review your usage history and feature performance with charts and event tracking.</p>
            <Link to="/analytics" className="mt-5 inline-block rounded-2xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
              View analytics
            </Link>
          </article>
        </section>
      </div>
    </div>
  )
}
