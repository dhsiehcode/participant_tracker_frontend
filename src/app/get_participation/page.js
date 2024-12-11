"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


function DataTable() {
  const [data, setData] = useState([]);

  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  // Fetch data from the API on component mount
  useEffect(() => {
    const apiUrl = 'https://participant-tracker-backend.onrender.com/api/participant_experiment/'; // Replace with your API endpoint

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Update state with data from API
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <div className="details_container">
    <button className="back_button" onClick={goBack}>
      ← Go Back
    </button>
  </div>
    <div style={styles.container}>
      <h2 style={styles.header}>Experiment Data</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Experiment ID</th>
            <th>Participant ID</th>
            <th>Collect Data</th>
            <th>Experiment Date</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.experiment_id}</td>
              <td>{item.participant_id}</td>
              <td>{item.collect_data ? 'Yes' : 'No'}</td>
              <td>{item.experiment_date}</td>
              <td>{item.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
}

const styles = {
  details_container: {
    position: 'relative',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    border: '1px solid #ddd',
    borderRadius: '2px',
    backgroundColor: '#f9f9f9',

  },
  
  /* Back button styling */
  back_button:{
    position: 'absolute',
    top: '10px',
    left: '10px',
    padding: '10px 15px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'background-color 0.3s',
  },
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9'
  },
  header: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '15px'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    borderBottom: '1px solid #ddd',
    padding: '10px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  td: {
    padding: '8px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left',
  },
};

export default DataTable;
