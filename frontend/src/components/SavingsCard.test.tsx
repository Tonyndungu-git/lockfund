import { render, screen } from '@testing-library/react';
import SavingsCard from '../components/SavingsCard';
import { describe, it, expect } from 'vitest';

describe('SavingsCard', () => {
  it('renders correctly with given props', () => {
    render(
      <SavingsCard
        goalName="Buy a Car"
        lockedAmount={5000}
        targetAmount={20000}
        releaseDate="2025-12-31"
      />
    );

    expect(screen.getByText('Buy a Car')).toBeInTheDocument();
    expect(screen.getByText('Locked: $5000 / $20000')).toBeInTheDocument();
    expect(screen.getByText(/Release Date:/)).toBeInTheDocument();
  });

  it('calculates the progress bar width correctly', () => {
    const { container } = render(
      <SavingsCard
        goalName="Vacation"
        lockedAmount={250}
        targetAmount={1000}
        releaseDate="2026-06-30"
      />
    );
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle('width: 25%');
  });

  it('handles zero locked amount', () => {
    const { container } = render(
      <SavingsCard
        goalName="New Laptop"
        lockedAmount={0}
        targetAmount={1500}
        releaseDate="2025-10-01"
      />
    );
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle('width: 0%');
    expect(screen.getByText('Locked: $0 / $1500')).toBeInTheDocument();
  });

  it('handles completed goals', () => {
    const { container } = render(
      <SavingsCard
        goalName="Emergency Fund"
        lockedAmount={5000}
        targetAmount={5000}
        releaseDate="2025-01-01"
      />
    );
    const progressBar = container.querySelector('.bg-blue-600');
    expect(progressBar).toHaveStyle('width: 100%');
    expect(screen.getByText('Locked: $5000 / $5000')).toBeInTheDocument();
  });
});
