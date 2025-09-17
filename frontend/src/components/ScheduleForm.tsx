import React, { useState } from 'react';
import api from '../services/api';

/**
 * ScheduleForm component for LockFund.
 * Allows users to create or edit a savings schedule.
 * Includes validation and user-friendly error messages.
 */
const ScheduleForm: React.FC = () => {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [frequency, setFrequency] = useState('daily');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!goalName || !targetAmount || !releaseDate) {
      setError('All fields are required.');
      return;
    }

    try {
      await api.post('/schedules/', {
        goal_name: goalName,
        target_amount: parseFloat(targetAmount),
        release_date: new Date(releaseDate).toISOString(),
        frequency: frequency,
      });
      setSuccess('Schedule created successfully!');
      // Clear form
      setGoalName('');
      setTargetAmount('');
      setReleaseDate('');
      setFrequency('daily');
      // Consider a callback to refresh the schedule list on the parent page
    } catch (err) {
      setError('Failed to create schedule.');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md space-y-4">
      <h2 className="text-xl font-semibold text-gray-800">Create New Schedule</h2>
      
      {error && <p className="text-sm text-red-500 p-3 bg-red-100 rounded-md">{error}</p>}
      {success && <p className="text-sm text-green-500 p-3 bg-green-100 rounded-md">{success}</p>}

      <div>
        <label htmlFor="goalName" className="block text-sm font-medium text-gray-700">Goal Name</label>
        <input
          type="text"
          id="goalName"
          value={goalName}
          onChange={(e) => setGoalName(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., New Car Fund"
        />
      </div>
      <div>
        <label htmlFor="targetAmount" className="block text-sm font-medium text-gray-700">Target Amount ($)</label>
        <input
          type="number"
          id="targetAmount"
          value={targetAmount}
          onChange={(e) => setTargetAmount(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="e.g., 5000"
        />
      </div>
      <div>
        <label htmlFor="releaseDate" className="block text-sm font-medium text-gray-700">Release Date</label>
        <input
          type="date"
          id="releaseDate"
          value={releaseDate}
          onChange={(e) => setReleaseDate(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label htmlFor="frequency" className="block text-sm font-medium text-gray-700">Release Frequency</label>
        <select
          id="frequency"
          value={frequency}
          onChange={(e) => setFrequency(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        Save Schedule
      </button>
    </form>
  );
};

export default ScheduleForm;
