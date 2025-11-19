import { useEffect, useState } from 'react'

const API_BASE = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

function StatusBadge({ status }) {
  const map = {
    pending: 'bg-amber-500/15 text-amber-300 ring-1 ring-amber-400/30',
    approved: 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-400/30',
    rejected: 'bg-rose-500/15 text-rose-300 ring-1 ring-rose-400/30',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${map[status] || ''}`}>{status}</span>
  )
}

function Card({ item, onApprove, onReject }) {
  return (
    <div className="bg-slate-800/70 backdrop-blur border border-slate-700 rounded-xl p-4 shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-white font-semibold leading-tight">{item.title}</h3>
          <p className="text-slate-300/80 text-sm mt-1 line-clamp-2">{item.description || 'No description'}</p>
        </div>
        <StatusBadge status={item.status} />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-slate-400 text-sm">
          <span className="block">By {item.requester}</span>
          {item.amount != null && (
            <span className="block font-semibold text-slate-200 mt-0.5">${item.amount.toFixed(2)}</span>
          )}
        </div>
        <div className="flex gap-2">
          <button onClick={() => onReject(item)} className="px-3 py-1.5 text-sm rounded-md bg-rose-600/80 hover:bg-rose-600 text-white transition disabled:opacity-50" disabled={item.status !== 'pending'}>Reject</button>
          <button onClick={() => onApprove(item)} className="px-3 py-1.5 text-sm rounded-md bg-emerald-600/80 hover:bg-emerald-600 text-white transition disabled:opacity-50" disabled={item.status !== 'pending'}>Approve</button>
        </div>
      </div>
    </div>
  )
}

function ApprovalGrid() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const fetchItems = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${API_BASE}/api/approvals`)
      if (!res.ok) throw new Error('Failed to load')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchItems() }, [])

  const approve = async (item) => {
    const res = await fetch(`${API_BASE}/api/approvals/${item.id}/approve`, { method: 'POST' })
    if (res.ok) fetchItems()
  }

  const reject = async (item) => {
    const res = await fetch(`${API_BASE}/api/approvals/${item.id}/reject`, { method: 'POST' })
    if (res.ok) fetchItems()
  }

  const seed = async () => {
    await fetch(`${API_BASE}/api/approvals/seed`, { method: 'POST' })
    fetchItems()
  }

  return (
    <section className="px-4 py-6">
      <div className="max-w-md mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-semibold">Pending approvals</h2>
          <button onClick={seed} className="text-xs px-2.5 py-1 rounded bg-blue-600/80 hover:bg-blue-600 text-white">Seed</button>
        </div>

        {loading && <p className="text-slate-300">Loading...</p>}
        {error && <p className="text-rose-300">{error}</p>}

        <div className="grid grid-cols-2 gap-3">
          {items.map((it) => (
            <Card key={it.id} item={it} onApprove={approve} onReject={reject} />
          ))}
        </div>

        {!loading && items.length === 0 && (
          <div className="text-center text-slate-400 text-sm mt-6">
            No items. Tap Seed to add examples.
          </div>
        )}
      </div>
    </section>
  )
}

export default ApprovalGrid
