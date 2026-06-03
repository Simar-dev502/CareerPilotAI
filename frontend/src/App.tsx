import React from 'react'
import { Routes, Route, Link, Navigate } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import UploadResume from './pages/UploadResume'
import InterviewPrep from './pages/InterviewPrep'
import CoverLetter from './pages/CoverLetter'
import RoadmapGenerator from './pages/RoadmapGenerator'
import JobRecommendations from './pages/JobRecommendations'
import GitHubAnalyzer from './pages/GitHubAnalyzer'
import LinkedInAnalyzer from './pages/LinkedInAnalyzer'
import LeetCodeTracker from './pages/LeetCodeTracker'
import AnalyticsDashboard from './pages/AnalyticsDashboard'

export default function App() {
  const { token } = useAuth()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-900/70 p-4 shadow-2xl backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between">
          <Link to="/" className="text-lg font-semibold text-cyan-300">
            CareerPilot AI
          </Link>
          <div className="flex flex-wrap items-center gap-2 text-sm text-slate-300">
            <Link to="/resume" className="hover:text-white">
              ATS Analyzer
            </Link>
            <Link to="/interview" className="hover:text-white">
              Interview Prep
            </Link>
            <Link to="/cover-letter" className="hover:text-white">
              Cover Letter
            </Link>
            <Link to="/roadmap" className="hover:text-white">
              Roadmap
            </Link>
            <Link to="/jobs" className="hover:text-white">
              Job Matches
            </Link>
            <Link to="/github" className="hover:text-white">
              GitHub
            </Link>
            <Link to="/linkedin" className="hover:text-white">
              LinkedIn
            </Link>
            <Link to="/leetcode" className="hover:text-white">
              LeetCode
            </Link>
            <Link to="/analytics" className="hover:text-white">
              Analytics
            </Link>
          </div>
        </div>

        <Routes>
          <Route path="/" element={token ? <Dashboard /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={!token ? <Login /> : <Navigate to="/" replace />} />
          <Route path="/register" element={!token ? <Register /> : <Navigate to="/" replace />} />
          <Route path="/resume" element={<ProtectedRoute><ResumeAnalyzer /></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><UploadResume /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute><InterviewPrep /></ProtectedRoute>} />
          <Route path="/cover-letter" element={<ProtectedRoute><CoverLetter /></ProtectedRoute>} />
          <Route path="/roadmap" element={<ProtectedRoute><RoadmapGenerator /></ProtectedRoute>} />
          <Route path="/jobs" element={<ProtectedRoute><JobRecommendations /></ProtectedRoute>} />
          <Route path="/github" element={<ProtectedRoute><GitHubAnalyzer /></ProtectedRoute>} />
          <Route path="/linkedin" element={<ProtectedRoute><LinkedInAnalyzer /></ProtectedRoute>} />
          <Route path="/leetcode" element={<ProtectedRoute><LeetCodeTracker /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={token ? '/' : '/login'} replace />} />
        </Routes>
      </div>
    </div>
  )
}
