import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Calendar() {
  const [jobs, setJobs] = useState();

  console.log(process.env.REACT_APP_APP_KEY);
    let api = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&results_per_page=20&what=javascript%20developer&content-type=application/json`;


    useEffect(() => {
      try {
        const fetchJobs = async () => {
          const response = await fetch(api);
          const json = await response.json();
          setJobs(json);
        }

        fetchJobs();
      } catch { }
    }, [api]);

    return (
      <div className="jobsearch">
        <Navbar />
        <h1>Search for Jobs</h1>
        {jobs && jobs.results.map((stat, index) => (
            <div key={index} className="stat-card">
              <h3>{stat.value}</h3>
              <p>{stat.title}</p>
            </div>
          ))}
      </div>
    );
  }