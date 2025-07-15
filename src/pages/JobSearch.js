import Navbar from '../components/Navbar';
export default function Calendar() {
  console.log(process.env.REACT_APP_APP_KEY);
    let api = `http://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${process.env.REACT_APP_APP_ID}&app_key=${process.env.REACT_APP_APP_KEY}&results_per_page=20&what=javascript%20developer&content-type=application/json`;

    fetch(api).then(async (response) => {
      console.log(await response.json());
    });

    return (
      <div className="jobsearch">
        <Navbar />
        <h1>Search for Jobs</h1>
        
      </div>
    );
  }