import { useState, useEffect } from 'react';

export default function JobDisplayBox({page, results_per_page, what}) {
    const [jobs, setJobs] = useState();

    let api = `http://api.adzuna.com/v1/api/jobs/us/search/${page}?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&results_per_page=${results_per_page}&what=${what}&content-type=application/json`;

    useEffect(() => {
      try {
        const fetchJobs = async () => {
          const response = await fetch(api);
          const json = await response.json();
          console.log(json);
          setJobs(json);
        }

        fetchJobs();
      } catch { }
    }, [api]);

    return <>
        {jobs && jobs.results.map((job, index) => (
            <div key={index} className="stat-card">
                <a href={job.redirect_url}><p>{job.title}</p></a>
                {job.salary_min == job.salary_max ? <p>salary: ${job.salary_min.toLocaleString()}</p> : <p>salary: ${job.salary_min.toLocaleString()}-{job.salary_max.toLocaleString()}</p>}
                <p>type: {job.contract_type}</p>
                <p>location: {job.location.display_name}</p>
            </div>
        ))}
    </>
}