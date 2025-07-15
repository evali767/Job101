import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard({ applications }) {
    // calculate stats from application status data
    const stats = [
        { title: "Total Applications", value: applications.length },
        {
            title: "Need to Apply",
            value: applications.filter(app => app.status === "Apply").length
        },
        {
            title: "Interviews Scheduled",
            value: applications.filter(app => app.status === "Interview").length
        },
        {
            title: "Rejected",
            value: applications.filter(app => app.status === "Rejected").length
        },
        {
            title: "Offer",
            value: applications.filter(app => app.status === "Offer").length
        },
    ];

    return (
        <div className="dashboard">
            <Navbar />
            <h1>Dashboard</h1>

            {/* overview */}
            <div className="stats-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="stat-card">
                        <h3>{stat.value}</h3>
                        <p>{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* aplications list */}
            <div className="applications-list">
                <div className="list-header">
                    <h2>Your Applications</h2>
                    <Link to="/add-application" className="add-button">
                        + Track New Application
                    </Link>
                </div>

                {applications.length > 0 ? (
                    <div className="applications">
                        {applications.map(app => (
                            <div key={app.id} className="application-card">
                                <h3>
                                    <Link to={`/application/${app.id}`}>{app.company}</Link>
                                </h3>
                                <h3>{app.company}</h3>
                                <p>{app.position}</p>
                                {app.link && (
                                    <a
                                        href={app.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="job-link"
                                    >
                                        View Job Posting
                                    </a>
                                )}
                                <p className={`status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </p>
                                <p>Applied: {app.date}</p>
                                <Link
                                    to={`/application/${app.id}/notes`}
                                    className="notes-button"
                                >
                                    Notes
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No applications yet. Add your first application!</p>
                )}
            </div>
        </div>
    );
}