import Navbar from '../components/Navbar';
export default function Dashboard() {
    // **fake data for now, but replace with API calls later
    const stats = [
      { title: "Total Applications", value: 12 },
      { title: "Interviews Scheduled", value: 3 },
      { title: "Rejected", value: 2 },
    ];
  
    return (
      <div className="dashboard">
        <Navbar />
        <h1>Dashboard</h1>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }