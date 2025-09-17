import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ScheduleForm from '../components/ScheduleForm';
import { Schedule } from '../types'; // We will create this type definition file

const SchedulesPage: React.FC = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await api.get('/schedules/');
        setSchedules(response.data);
      } catch (err) {
        setError('Failed to fetch schedules.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedules();
  }, []);

  if (loading) return <p>Loading schedules...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-6">My Schedules</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Existing Schedules</h2>
            {schedules.length > 0 ? (
              <ul>
                {schedules.map((schedule) => (
                  <li key={schedule.id} className="border-b py-2">
                    <p className="font-bold">{schedule.goal_name}</p>
                    <p>Target: ${schedule.target_amount}</p>
                    <p>Frequency: {schedule.frequency}</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>You haven't created any schedules yet.</p>
            )}
          </div>
        </div>
        <div>
          <ScheduleForm />
        </div>
      </div>
    </div>
  );
};

export default SchedulesPage;
