import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function Dashboard({ applications }) {
    // state for search and filter
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    // calculate stats from application status data
    const stats = [
        { title: "Total Applications", value: applications.length },
        {
            title: "Apply",
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

    // filter applications based on search query and status filter
    const filteredApplications = applications.filter(app => {
        const searchTermLower = searchTerm.toLowerCase();
        const companyLower = app.company?.toLowerCase() || '';
        const positionLower = app.position?.toLowerCase() || '';
        const notesLower = typeof app.notes === 'string' ? app.notes.toLowerCase() : '';

        const matchesSearch =
            companyLower.includes(searchTermLower) ||
            positionLower.includes(searchTermLower) ||
            notesLower.includes(searchTermLower);

        // check if application matches selected status filter or show all
        const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

        return matchesSearch && matchesStatus;
    });
    // get status values for filter dropdown from exitsing applications
    const statusOptions = ['All', ...new Set(applications.map(app => app.status))];

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

            {/* applications list with filters */}
            <div className="applications-list">
                <div className="list-header">
                    <h2>Your Applications</h2>
                    <div className="controls">
                        <div className="search-filter-container">
                            <input
                                type="text"
                                placeholder="Search by company, position, or notes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="search-input"
                            />
                            <select
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                                className="status-filter"
                            >
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>
                                        {status}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <Link to="/add-application" className="add-button">
                            + Track New Application
                        </Link>
                    </div>
                </div>

                {filteredApplications.length > 0 ? (
                    <div className="applications">
                        {filteredApplications.map(app => (
                            <div key={app.id} className="application-card">
                                <h3>
                                    <Link to={`/application/${app.id}`}>{app.company}</Link>
                                </h3>
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
                                <p id="dashstatus" className={`status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </p>
                                <p>Date Applied: {app.date}</p>
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
                    <p>No applications found matching your criteria.</p>
                )}
            </div>
        </div>
    );
}
