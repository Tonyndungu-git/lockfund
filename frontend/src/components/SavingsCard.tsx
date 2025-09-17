import React from 'react';

interface SavingsCardProps {
  goalName: string;
  lockedAmount: number;
  targetAmount: number;
  releaseDate: string;
}

/**
 * SavingsCard component for LockFund.
 * Displays information about a single savings goal.
 */
const SavingsCard: React.FC<SavingsCardProps> = ({ goalName, lockedAmount, targetAmount, releaseDate }) => {
  const progress = (lockedAmount / targetAmount) * 100;

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold">{goalName}</h2>
      <div className="my-2">
        <p className="text-sm text-gray-600">Locked: ${lockedAmount} / ${targetAmount}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      <p className="text-sm text-gray-500">Release Date: {new Date(releaseDate).toLocaleDateString()}</p>
    </div>
  );
};

export default SavingsCard;
