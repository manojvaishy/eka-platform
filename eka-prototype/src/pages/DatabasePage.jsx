import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { Database, Users, RefreshCw, Wifi } from 'lucide-react';

function DatabasePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [localData, setLocalData] = useState(null);

  useEffect(() => {
    // Load local data
    const userData = localStorage.getItem('userData');
    if (userData) setLocalData(JSON.parse(userData));

    // Real-time Firestore listener
    const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    }, (err) => {
      console.log('Firestore error:', err);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-green-400 font-mono p-6">
      {/* Header */}
      <div className="mb-6 border border-green-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Database className="w-6 h-6 text-green-400" />
            <span className="text-green-300 text-xl font-bold">EKA DATABASE</span>
            <span className="text-xs bg-green-900 text-green-300 px-2 py-1 rounded">LIVE</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-green-600">
            <Wifi className="w-4 h-4" />
            <span>Firebase Firestore • Connected</span>
          </div>
        </div>
        <div className="text-xs text-green-600">
          Project: eka-platform • Region: asia-south1 • 
          Last sync: {lastUpdated || 'connecting...'}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-green-800 rounded p-3">
          <div className="text-xs text-green-600 mb-1">TOTAL USERS</div>
          <div className="text-2xl text-green-300">{users.length}</div>
        </div>
        <div className="border border-green-800 rounded p-3">
          <div className="text-xs text-green-600 mb-1">COLLECTION</div>
          <div className="text-lg text-green-300">users</div>
        </div>
        <div className="border border-green-800 rounded p-3">
          <div className="text-xs text-green-600 mb-1">STATUS</div>
          <div className="text-lg text-green-300">{loading ? '⏳ Loading...' : '✅ Active'}</div>
        </div>
      </div>

      {/* Firestore Users Table */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4" />
          <span className="text-green-300 font-bold">TABLE: users (Firestore)</span>
          <span className="text-xs text-green-700">— {users.length} records</span>
        </div>

        {loading ? (
          <div className="border border-green-800 rounded p-4 text-green-600 text-sm">
            ⏳ Connecting to Firebase Firestore...
          </div>
        ) : users.length === 0 ? (
          <div className="border border-green-800 rounded p-4 text-green-600 text-sm">
            📭 No users yet. Complete onboarding to see data here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-green-800">
                  <th className="text-left p-2 text-green-500">DOC_ID</th>
                  <th className="text-left p-2 text-green-500">NAME</th>
                  <th className="text-left p-2 text-green-500">PHONE</th>
                  <th className="text-left p-2 text-green-500">CITY</th>
                  <th className="text-left p-2 text-green-500">LANGUAGE</th>
                  <th className="text-left p-2 text-green-500">SKILLS</th>
                  <th className="text-left p-2 text-green-500">ROLES</th>
                  <th className="text-left p-2 text-green-500">JOINED</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, i) => (
                  <tr key={user.id} className={`border-b border-green-900 ${i % 2 === 0 ? 'bg-green-950' : ''}`}>
                    <td className="p-2 text-green-600">{user.id}</td>
                    <td className="p-2 text-green-300">{user.name || '-'}</td>
                    <td className="p-2 text-green-400">{user.phone || '-'}</td>
                    <td className="p-2 text-green-400">{user.location?.city || '-'}</td>
                    <td className="p-2 text-yellow-500">{user.language || '-'}</td>
                    <td className="p-2 text-cyan-400">{user.skills?.slice(0,2).join(', ') || '-'}</td>
                    <td className="p-2 text-purple-400">{user.roles?.join(', ') || '-'}</td>
                    <td className="p-2 text-green-600">{user.joinedDate ? new Date(user.joinedDate).toLocaleDateString() : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* LocalStorage Current Session */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-green-300 font-bold">TABLE: current_session (localStorage)</span>
        </div>
        {localData ? (
          <div className="border border-green-800 rounded p-4">
            <pre className="text-xs text-green-400 overflow-x-auto whitespace-pre-wrap">
{JSON.stringify({
  id: localData.id,
  name: localData.name,
  phone: localData.phone,
  city: localData.location?.city,
  state: localData.location?.state,
  language: localData.language,
  skills: localData.skills,
  roles: localData.roles,
  education: localData.education,
  trustScore: localData.trustScore,
  joinedDate: localData.joinedDate
}, null, 2)}
            </pre>
          </div>
        ) : (
          <div className="border border-green-800 rounded p-4 text-green-600 text-sm">
            📭 No session data. Please login first.
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="text-xs text-green-800 border-t border-green-900 pt-4">
        EKA Platform Database Viewer • Firebase Firestore • Real-time sync enabled
        <br />
        <a href="/eka-platform/dashboard" className="text-green-600 hover:text-green-400 underline">
          ← Back to Dashboard
        </a>
      </div>
    </div>
  );
}

export default DatabasePage;
