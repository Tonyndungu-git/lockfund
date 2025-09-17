import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SavingsCard from '../components/SavingsCard';
import { Schedule } from '../types';
import { FaLock, FaUnlockAlt, FaBullseye } from 'react-icons/fa';

const Dashboard: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get('/schedules/?limit=3'); // Fetch latest 3
        setSchedules(response.data);
      } catch (err) {
        setError('Failed to fetch dashboard data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  const totalLocked = schedules.reduce((sum, s) => sum + s.locked_amount, 0);
  const nextRelease = schedules.length > 0 ? new Date(schedules[0].release_date).toLocaleDateString() : 'N/A';

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome Back!</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaLock className="text-3xl text-indigo-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Total Locked</p>
            <p className="text-2xl font-bold">${totalLocked.toFixed(2)}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaUnlockAlt className="text-3xl text-green-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Next Release</p>
            <p className="text-2xl font-bold">{nextRelease}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
          <FaBullseye className="text-3xl text-red-500 mr-4" />
          <div>
            <p className="text-sm text-gray-500">Active Goals</p>
            <p className="text-2xl font-bold">{schedules.length}</p>
          </div>
        </div>
      </div>

      {/* Recent Schedules */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Recent Savings Goals</h2>
        {loading && <p>Loading your savings goals...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schedules.length > 0 ? (
              schedules.map(schedule => (
                <SavingsCard 
                  key={schedule.id}
                  goalName={schedule.goal_name}
                  lockedAmount={schedule.locked_amount}
                  targetAmount={schedule.target_amount}
                  releaseDate={schedule.release_date}
                />
              ))
            ) : (
              <p>No savings goals found. Create one on the Schedules page!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
