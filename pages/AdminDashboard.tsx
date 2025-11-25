import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock Data for Admin
const userActivityData = [
  { name: 'Mon', scans: 400 },
  { name: 'Tue', scans: 300 },
  { name: 'Wed', scans: 550 },
  { name: 'Thu', scans: 450 },
  { name: 'Fri', scans: 700 },
  { name: 'Sat', scans: 900 },
  { name: 'Sun', scans: 850 },
];

const threatDistributionData = [
  { name: 'Malware', value: 400 },
  { name: 'Phishing', value: 300 },
  { name: 'Adware', value: 300 },
  { name: 'Spyware', value: 200 },
];

// Updated Colors: Purple removed, Green/Teal prioritized
const COLORS = ['#10b981', '#ef4444', '#f59e0b', '#2dd4bf'];

export const AdminDashboard: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Insights</h1>
          <p className="text-slate-300">Overview of system performance and user security metrics.</p>
        </div>
        <div className="glass-panel px-4 py-2 rounded-xl text-sm font-medium text-slate-300">
          Last updated: Just now
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Users', val: '12,345', delta: '+12%', color: 'text-brand-400' },
          { label: 'Threats Blocked', val: '8,902', delta: '+5%', color: 'text-emerald-400' },
          { label: 'Active Scans', val: '143', delta: 'Now', color: 'text-accent-400' },
          { label: 'Critical Issues', val: '24', delta: '-2%', color: 'text-red-400' },
        ].map((stat, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl shadow-lg relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-20 h-20 opacity-10 rounded-full blur-xl translate-x-4 -translate-y-4 ${stat.color.replace('text', 'bg')}`}></div>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <div className="flex items-end gap-2 mt-2">
              <span className="text-3xl font-bold text-white">{stat.val}</span>
              <span className={`text-sm font-bold ${stat.color} mb-1`}>{stat.delta}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        
        {/* Activity Chart */}
        <div className="glass-card p-6 rounded-2xl h-96">
          <h3 className="text-lg font-bold text-white mb-6">Weekly Scan Volume</h3>
          <ResponsiveContainer width="100%" height="85%">
            <BarChart data={userActivityData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="name" tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
              <YAxis tick={{fill: '#94a3b8'}} axisLine={false} tickLine={false} />
              <Tooltip 
                cursor={{fill: 'rgba(255,255,255,0.05)'}}
                contentStyle={{borderRadius: '12px', background: '#064e3b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}}
              />
              <Bar dataKey="scans" fill="#10b981" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribution Chart */}
        <div className="glass-card p-6 rounded-2xl h-96">
          <h3 className="text-lg font-bold text-white mb-6">Threat Type Distribution</h3>
          <div className="flex items-center justify-center h-[85%]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={threatDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {threatDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '12px', background: '#064e3b', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 pr-8">
               {threatDistributionData.map((entry, index) => (
                 <div key={index} className="flex items-center gap-3 text-sm text-slate-300">
                    <div className="w-3 h-3 rounded-full shadow-[0_0_8px]" style={{backgroundColor: COLORS[index], boxShadow: `0 0 8px ${COLORS[index]}`}}></div>
                    <span>{entry.name}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>

      {/* Recent Users Table */}
      <div className="glass-card rounded-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-white/5">
          <h3 className="text-lg font-bold text-white">Recent Registrations</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-white/5 text-slate-200 font-medium">
              <tr>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Device</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">alice@example.com</td>
                <td className="px-6 py-4">iPhone 14 Pro</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-brand-500/20 text-brand-300 rounded text-xs font-bold border border-brand-500/30">USER</span></td>
                <td className="px-6 py-4 text-emerald-400 font-medium">Active</td>
              </tr>
              <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">bob@admin.com</td>
                <td className="px-6 py-4">MacBook Pro M2</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-teal-500/20 text-teal-300 rounded text-xs font-bold border border-teal-500/30">ADMIN</span></td>
                <td className="px-6 py-4 text-emerald-400 font-medium">Active</td>
              </tr>
               <tr className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">charlie@example.com</td>
                <td className="px-6 py-4">Samsung S23</td>
                <td className="px-6 py-4"><span className="px-2 py-1 bg-brand-500/20 text-brand-300 rounded text-xs font-bold border border-brand-500/30">USER</span></td>
                <td className="px-6 py-4 text-orange-400 font-medium">Flagged</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};