import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot } from 'firebase/firestore';

function DatabasePage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [localData, setLocalData] = useState(null);
  const [activeTab, setActiveTab] = useState('users');

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if (userData) setLocalData(JSON.parse(userData));

    const unsub = onSnapshot(collection(db, 'users'), (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
      setLastUpdated(new Date().toLocaleTimeString());
      setLoading(false);
    }, () => setLoading(false));

    return () => unsub();
  }, []);

  const tables = ['users', 'courses', 'jobs', 'services', 'enrollments', 'posts', 'wallet', 'reviews'];

  return (
    <div className="min-h-screen bg-gray-950 text-gray-300 font-mono text-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 border-b border-gray-700 px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-white font-bold text-base">MySQL Workbench — eka_platform_db</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span className="text-green-400">● Connected</span>
          <span>Host: db.eka-platform.com</span>
          <span>Port: 3306</span>
          <span>User: eka_admin</span>
        </div>
      </div>

      <div className="flex h-screen">
        {/* Left Sidebar - Schema */}
        <div className="w-56 bg-gray-900 border-r border-gray-700 p-3 overflow-y-auto">
          <div className="text-xs text-gray-500 uppercase mb-2 tracking-wider">Schemas</div>
          <div className="mb-3">
            <div className="flex items-center gap-2 text-yellow-400 font-bold mb-1">
              <span>🗄️</span>
              <span>eka_platform_db</span>
            </div>
            <div className="ml-4">
              <div className="text-xs text-gray-500 mb-1">Tables ({tables.length})</div>
              {tables.map(table => (
                <button
                  key={table}
                  onClick={() => setActiveTab(table)}
                  className={`w-full text-left flex items-center gap-2 px-2 py-1 rounded text-xs mb-0.5 transition ${
                    activeTab === table
                      ? 'bg-blue-900 text-blue-300'
                      : 'text-gray-400 hover:bg-gray-800'
                  }`}
                >
                  <span>📋</span>
                  <span>{table}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 uppercase mb-2 tracking-wider">Info</div>
          <div className="text-xs text-gray-600 space-y-1">
            <div>Engine: InnoDB</div>
            <div>Charset: utf8mb4</div>
            <div>Version: 8.0.32</div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* SQL Query Bar */}
          <div className="bg-gray-900 border-b border-gray-700 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-gray-500">Query Editor</span>
              <span className="text-xs bg-blue-900 text-blue-300 px-2 py-0.5 rounded">SQL</span>
            </div>
            <div className="bg-gray-950 border border-gray-700 rounded p-2 text-xs">
              <span className="text-blue-400">SELECT</span>
              <span className="text-gray-300"> * </span>
              <span className="text-blue-400">FROM</span>
              <span className="text-yellow-300"> eka_platform_db.{activeTab} </span>
              <span className="text-blue-400">ORDER BY</span>
              <span className="text-gray-300"> created_at </span>
              <span className="text-blue-400">DESC</span>
              <span className="text-gray-300">;</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <button className="bg-orange-600 hover:bg-orange-500 text-white text-xs px-3 py-1 rounded flex items-center gap-1">
                ▶ Execute
              </button>
              <span className="text-xs text-gray-600">
                {loading ? 'Executing...' : `${activeTab === 'users' ? users.length : '—'} row(s) returned • ${lastUpdated || '—'}`}
              </span>
            </div>
          </div>

          {/* Result Grid */}
          <div className="flex-1 overflow-auto p-3">
            {activeTab === 'users' && (
              <>
                <div className="text-xs text-gray-500 mb-2">
                  Result Grid — Table: <span className="text-yellow-400">users</span> — {users.length} row(s)
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="bg-gray-800">
                        {['id (PK)', 'name', 'phone', 'city', 'state', 'language', 'skills', 'roles', 'education', 'trust_score', 'created_at'].map(col => (
                          <th key={col} className="border border-gray-700 px-3 py-2 text-left text-blue-300 font-semibold whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan={11} className="border border-gray-700 px-3 py-4 text-center text-gray-500">
                            ⏳ Executing query...
                          </td>
                        </tr>
                      ) : users.length === 0 ? (
                        <tr>
                          <td colSpan={11} className="border border-gray-700 px-3 py-4 text-center text-gray-500">
                            Empty set (0 rows) — Complete onboarding to insert data
                          </td>
                        </tr>
                      ) : (
                        users.map((user, i) => (
                          <tr key={user.id} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}>
                            <td className="border border-gray-700 px-3 py-1.5 text-orange-400 whitespace-nowrap">{user.id?.slice(0,16)}...</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-green-300 whitespace-nowrap">{user.name || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-300 whitespace-nowrap">{user.phone || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-300">{user.location?.city || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-300">{user.location?.state || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-yellow-300">{user.language || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-cyan-300 whitespace-nowrap">{user.skills?.slice(0,2).join(', ') || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-purple-300">{user.roles?.join(', ') || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-300 whitespace-nowrap">{user.education || 'NULL'}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-300">{user.trustScore ?? 0}</td>
                            <td className="border border-gray-700 px-3 py-1.5 text-gray-500 whitespace-nowrap">{user.joinedDate ? new Date(user.joinedDate).toLocaleString() : 'NULL'}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab !== 'users' && (
              <div>
                <div className="text-xs text-gray-500 mb-2">
                  Result Grid — Table: <span className="text-yellow-400">{activeTab}</span>
                </div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-800">
                      {getColumns(activeTab).map(col => (
                        <th key={col} className="border border-gray-700 px-3 py-2 text-left text-blue-300 font-semibold">
                          {col}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {getSampleData(activeTab).map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-gray-900' : 'bg-gray-950'}>
                        {Object.values(row).map((val, j) => (
                          <td key={j} className="border border-gray-700 px-3 py-1.5 text-gray-300 whitespace-nowrap">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Bottom Status Bar */}
          <div className="bg-gray-900 border-t border-gray-700 px-4 py-1.5 flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-4">
              <span className="text-green-400">● eka_platform_db</span>
              <span>MySQL 8.0.32</span>
              <span>InnoDB</span>
            </div>
            <div className="flex items-center gap-4">
              <span>Rows: {activeTab === 'users' ? users.length : getSampleData(activeTab).length}</span>
              <span>Last sync: {lastUpdated || 'connecting...'}</span>
              <a href="/eka-platform/dashboard" className="text-blue-400 hover:text-blue-300">← Dashboard</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function getColumns(table) {
  const cols = {
    courses: ['id (PK)', 'title', 'category', 'level', 'language', 'price', 'rating', 'enrollment_count', 'instructor_id', 'created_at'],
    jobs: ['id (PK)', 'title', 'employer_id', 'city', 'salary_min', 'salary_max', 'job_type', 'verified', 'posted_at'],
    services: ['id (PK)', 'provider_id', 'title', 'category', 'price', 'rating', 'city', 'available', 'created_at'],
    enrollments: ['id (PK)', 'user_id (FK)', 'course_id (FK)', 'progress', 'enrolled_at', 'completed_at'],
    posts: ['id (PK)', 'user_id (FK)', 'content', 'likes', 'comments', 'achievement', 'created_at'],
    wallet: ['id (PK)', 'user_id (FK)', 'balance', 'total_earned', 'pending', 'last_transaction'],
    reviews: ['id (PK)', 'reviewer_id (FK)', 'target_id (FK)', 'target_type', 'rating', 'comment', 'created_at'],
  };
  return cols[table] || ['id', 'data'];
}

function getSampleData(table) {
  const data = {
    courses: [
      { id: 'crs_001', title: 'Professional Tailoring', category: 'sewing', level: 'beginner', language: 'Hindi', price: 'FREE', rating: '4.8', enrollments: '1250', instructor: 'inst_003', created: '2026-01-15' },
      { id: 'crs_002', title: 'Bridal Makeup', category: 'beauty', level: 'intermediate', language: 'Hindi', price: '₹2999', rating: '4.9', enrollments: '856', instructor: 'inst_002', created: '2026-01-20' },
      { id: 'crs_003', title: 'Digital Marketing', category: 'digital', level: 'beginner', language: 'English', price: '₹1999', rating: '4.6', enrollments: '1450', instructor: 'inst_004', created: '2026-02-01' },
    ],
    jobs: [
      { id: 'job_001', title: 'Tailor - Home Based', employer: 'emp_001', city: 'Mumbai', min: '₹8000', max: '₹15000', type: 'part-time', verified: 'YES', posted: '2026-04-10' },
      { id: 'job_002', title: 'Beauty Parlour Staff', employer: 'emp_002', city: 'Delhi', min: '₹12000', max: '₹20000', type: 'full-time', verified: 'YES', posted: '2026-04-12' },
    ],
    services: [
      { id: 'svc_001', provider: 'usr_001', title: 'Blouse Stitching', category: 'tailoring', price: '₹300', rating: '4.8', city: 'Pune', available: 'YES', created: '2026-03-01' },
      { id: 'svc_002', provider: 'usr_002', title: 'Bridal Makeup', category: 'beauty', price: '₹2500', rating: '4.9', city: 'Mumbai', available: 'YES', created: '2026-03-05' },
    ],
    enrollments: [
      { id: 'enr_001', user_id: 'usr_001', course_id: 'crs_001', progress: '45%', enrolled: '2026-04-01', completed: 'NULL' },
      { id: 'enr_002', user_id: 'usr_001', course_id: 'crs_003', progress: '20%', enrolled: '2026-04-10', completed: 'NULL' },
    ],
    posts: [
      { id: 'pst_001', user_id: 'usr_001', content: 'First earning milestone!', likes: '24', comments: '8', achievement: 'first_earning', created: '2026-04-14' },
    ],
    wallet: [
      { id: 'wlt_001', user_id: 'usr_001', balance: '₹2,450', total_earned: '₹8,200', pending: '₹500', last_txn: '2026-04-14' },
    ],
    reviews: [
      { id: 'rev_001', reviewer: 'usr_002', target: 'usr_001', type: 'service', rating: '5', comment: 'Excellent work!', created: '2026-04-13' },
    ],
  };
  return data[table] || [];
}

export default DatabasePage;
