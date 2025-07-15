import { useState } from 'react';

import Navbar from '../components/Navbar';
import JobDisplayBox from '../components/JobDisplayBox';
import { Dropdown, DropdownButton, DropdownItem, DropdownItems } from '../components/Dropdown';

const resultsPerPageOptions = [10, 20, 30, 40, 50];

export default function Calendar() {
  const [input, setInput] = useState("js developer");
  const [resultsPerPage, setResultsPerPage] = useState(20);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setInput(e.target.value);
    }
  };

  return (
    <div className="jobsearch">
      <Navbar />
      <h1>Search for Jobs</h1>
      <div style={styles.container}>
        <input type="text" name="Search box" style={styles.input} onKeyDown={(e) => handleKeyDown(e)}/>
        <Dropdown>
          <DropdownButton>{resultsPerPage} / page</DropdownButton>
              <DropdownItems>
                {resultsPerPageOptions.map((option) => 
                  <DropdownItem key={option} onClick={() => setResultsPerPage(option)}> {option} </DropdownItem>
                )}
              </DropdownItems>
        </Dropdown>
      </div>
      <JobDisplayBox page="1" results_per_page={resultsPerPage} what={input} />
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
    padding: '0 15px',
    borderRadius: '8px',
    border: '2px solid #999',
    outline: 'none',
  },
};