import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useEffect, useState } from 'react';
import { auth, db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";


export default function Dashboard() {
    // calculate stats from application status data
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearch] = useState('');

    useEffect(()=>{
        const fetchApplications = onAuthStateChanged(auth, async (user) => {
            try{
                const user = auth.currentUser;
                const documents = await getDocs(collection(db, "users", user.uid, "aplications"));

                const documentsDicts = documents.docs.map( doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                setApplications(documentsDicts);

            }catch(error){
                console.error("Error getting aplications", error);
            };
        });
        return () => fetchApplications();
    }, []);

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



    // // filter applications based on search query and status filter
    const filteredApplications = applications.filter(app => {
        const searchTermLowercase = searchTerm.toLowerCase();
        const company = app.company ? app.company.toLowerCase(): '';
        const position = app.position ? app.position.toLowerCase() : '';
        const notes = app.notes? app.notes.toLowerCase() : '';
        const status = app.status ? app.status.toLowerCase() : '';

        return (
            company.includes(searchTermLowercase) || position.includes(searchTermLowercase) || notes.includes (searchTermLowercase) || status.includes(searchTermLowercase)
        );
    });


    //     // check if application matches selected status filter or show all
    //     const matchesStatus = statusFilter === 'All' || app.status === statusFilter;

    //     return matchesSearch && matchesStatus;
    // });
    // // get status values for filter dropdown from exitsing applications
    // const statusOptions = ['All', ...new Set(applications.map(app => app.status))];

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
                    <input type="text" className='search-input'  value={searchTerm}
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search..."
                        />
                        {/* <div className="search-filter-container">
                            <input
                                type="text"
                                placeholder="Search"
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
                        </div> */}
                        <Link to="/add-application" className="add-button">
                            + Track New Application
                        </Link>
                    </div>
                </div>

                {applications.length > 0 ? (
                    <div className="applications">
                        {filteredApplications.map(app => (
                            <div key={app.id} className="application-card">
                                <h3>
                                    <Link to={`/application/${app.id}`}>{app.company}</Link>
                                </h3>
                                <p>{app.position}</p>

                                <p id="dashstatus" className={`status ${app.status.toLowerCase()}`}>
                                    {app.status}
                                </p>
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
