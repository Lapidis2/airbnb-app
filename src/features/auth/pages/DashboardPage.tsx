import { useStore } from '../../../store/StoreContext';

export default function DashboardPage() {
  const { state } = useStore();

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard!</p>
      <p>You have {state.saved.length} saved listings.</p>
    </div>
  );
}