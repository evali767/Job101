import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from '../components/Navbar';
import JobDisplayBox from '../components/JobDisplayBox';
import { Dropdown, DropdownButton, DropdownItem, DropdownItems } from '../components/Dropdown';

const resultsPerPageOptions = [5, 10, 20, 30, 40, 50, 100];
const defaultResultsPerPage = 50;

export default function JobSearch() {
  const [input, setInput] = useState("js developer");
  const [resultsPerPage, setResultsPerPage] = useState(defaultResultsPerPage);
  const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            setInput(e.target.value);
        }
    };

    // function to save job to dashboard after user clicks save button
    const handleSaveJob = (jobData) => {
        // navigate to add application page and prefill informaiton
        navigate('/add-application', {
            state: {
                position: jobData.position,
                link: jobData.link,
                company: jobData.company,
            }
        });
    };

    return (
        <div className="jobsearch">
            <Navbar />
            <h1>Search for Jobs</h1>
            <div style={styles.container}>
                <input type="text" name="Search box" style={styles.input} onKeyDown={(e) => handleKeyDown(e)} />
            </div>
            <Dropdown>
            <DropdownButton>{resultsPerPage} / page</DropdownButton>
                <DropdownItems>
                  {resultsPerPageOptions.map((option) => 
                    <DropdownItem key={option} onClick={() => setResultsPerPage(option)}> {option} </DropdownItem>
                  )}
                </DropdownItems>
          </Dropdown>
            <JobDisplayBox page="1" results_per_page={resultsPerPage} what={input} onSave={handleSaveJob} />
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '40%',
        height: '50px',
        fontSize: '1.5rem',
        padding: '0px 15px',
        margin: '0 0 20px 0',
        borderRadius: '8px',
        border: '2px solid #999',
        outline: 'none',
    },
};