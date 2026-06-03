import { useEffect, useMemo, useState } from 'react'
import api from '../services/api'

interface AnalyticsSummaryItem {
  action: string
  count: number
}

interface AnalyticsHistoryItem {
  action: string
  details?: Record<string, unknown>
  timestamp: string
}

const actionLabels: Record<string, string> = {
  resume_analyzed: 'Resume Analyzed',
  resume_uploaded: 'Resume Uploaded',
  interview_questions: 'Interview Questions',
  interview_evaluated: 'Interview Evaluated',
  cover_letter_generated: 'Cover Letter Generated',
  roadmap_generated: 'Roadmap Generated',
  job_recommendations: 'Job Recommendations',
  github_analyzed: 'GitHub Analyzed',
  linkedin_analyzed: 'LinkedIn Analyzed',
  leetcode_stats: 'LeetCode Stats',
}

function formatDetails(details?: Record<string, unknown>) {
  if (!details || Object.keys(details).length === 0) return 'No details available.'
  return Object.entries(details)
    .map(([key, value]) => `${key.replace(/_/g, ' ')}: ${value}`)
    .join(' · ')
}

export default function AnalyticsDashboard() {
  const [summary, setSummary] = useState<AnalyticsSummaryItem[]>([])
  const [history, setHistory] = useState<AnalyticsHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const response = await api.get('/api/analytics')
        setSummary(response.data.summary)
        setHistory(response.data.history)
      } catch (err) {
        setError('Unable to load analytics data. Please refresh or try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchAnalytics()
  }, [])

  const totalCount = useMemo(() => summary.reduce((sum, item) => sum + item.count, 0), [summary])
  const maxCount = useMemo(() => Math.max(...summary.map((item) => item.count), 1), [summary])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-slate-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="mb-8 rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Analytics Dashboard</p>
          <h1 className="mt-4 text-4xl font-semibold">Usage Trends & Activity History</h1>
          <p className="mt-3 max-w-3xl text-slate-400">Monitor how often you use CareerPilot features, evaluate what helps you most, and keep your workflow progress visible over time.</p>
        </header>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center text-slate-300">Loading analytics...</div>
        ) : error ? (
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/10 p-8 text-center text-rose-200">{error}</div>
        ) : (
          <div className="space-y-10">
            <section className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Summary</p>
                    <h2 className="mt-3 text-3xl font-semibold">Feature Usage</h2>
                  </div>
                  <div className="rounded-2xl bg-slate-900 px-4 py-2 text-sm text-slate-200">Total events: {totalCount}</div>
                </div>

                <div className="mt-8 space-y-4">
                  {summary.map((item) => (
                    <div key={item.action} className="space-y-2 rounded-3xl border border-white/10 bg-slate-900/60 p-4">
                      <div className="flex items-center justify-between gap-4 text-sm text-slate-300">
                        <span>{actionLabels[item.action] ?? item.action}</span>
                        <span className="font-semibold text-slate-100">{item.count}</span>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-slate-800">
                        <div
                          className="h-full rounded-full bg-cyan-400 transition-all duration-300"
                          style={{ width: `${(item.count / maxCount) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">Insights</p>
                <h2 className="mt-3 text-3xl font-semibold">What matters most</h2>
                <p className="mt-4 text-slate-400">Actions with higher usage show the CareerPilot tools you rely on most. Use this to track where your momentum is, then dive deeper into high-impact workflows.</p>
                <div className="mt-8 grid gap-4">
                  <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-300">Most active tool</p>
                    <p className="mt-2 text-xl font-semibold text-slate-100">{summary[0] ? actionLabels[summary[0].action] ?? summary[0].action : 'No activity yet'}</p>
                  </div>
                  <div className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                    <p className="text-sm text-slate-300">Record history</p>
                    <p className="mt-2 text-xl font-semibold text-slate-100">{history.length} recent actions</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 shadow-2xl backdrop-blur-xl">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">History</p>
                  <h2 className="mt-3 text-3xl font-semibold">Recent activity</h2>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                {history.length === 0 ? (
                  <p className="text-slate-400">No events recorded yet. Use CareerPilot features to build your activity history.</p>
                ) : (
                  history.map((event, index) => (
                    <div key={`${event.action}-${event.timestamp}-${index}`} className="rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/80">{actionLabels[event.action] ?? event.action}</p>
                          <p className="mt-2 text-sm text-slate-300">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">Event</span>
                      </div>
                      <p className="mt-4 text-slate-400">{formatDetails(event.details)}</p>
                    </div>
                  ))
                )}
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
