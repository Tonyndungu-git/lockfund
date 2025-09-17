export interface Schedule {
  id: number;
  user_id: number;
  goal_name: string;
  target_amount: number;
  locked_amount: number;
  start_date: string;
  release_date: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  is_active: number;
  created_at: string;
}
