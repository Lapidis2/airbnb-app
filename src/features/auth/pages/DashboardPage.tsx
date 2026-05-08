import { useSaved } from '../../listings/hooks/useSaved';

export default function DashboardPage() {
  const { data: saved = [] } = useSaved();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <p>You have {saved.length} saved listings.</p>
    </div>
  );
}