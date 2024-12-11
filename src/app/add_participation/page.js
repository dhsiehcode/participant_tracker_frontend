"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


function UserForm() {
  const [formData, setFormData] = useState({
    experiment_id: '',
    participant_id: '',
    experiment_date: '',
    location: '',
    collect_data: 'False',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'https://participant-tracker-backend.onrender.com/api/participation/';

    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then((response) => {
      if(response.ok) {
        alert("Successful");
      };
      
    });
  };

  return (
    <div>
            
    <div className="details_container">
    <button className="back_button" onClick={goBack}>
      ← Go Back
    </button>
  </div>
    <div style={styles.container}>
      <h2 style={styles.header}>Edit Participation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Experiment ID:
          <input
            type="text"
            name="experiment_id"
            value={formData.experiment_id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Participant ID:
          <input
            type="text"
            name="participant_id"
            value={formData.participant_id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Experiment Date:
          <input
            type="date"
            name="experiment_date"
            value={formData.experiment_date}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>


        <label style={styles.label}>
          Location:
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>



        <label style={styles.label}>
          Consent to Identifying Data Collection:
          <select
            name="collect_data"
            value={formData.collect_data}
            onChange={handleChange}
            style={styles.select}
          >
            <option value="False">No</option>
            <option value="True">Yes</option>
          </select>

          
        </label>

        <button type="submit" style={styles.button}>Submit</button>
      </form>
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
    maxWidth: '500px',
    margin: '50px auto',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9'
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px'
  },
  label: {
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  select: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px'
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default UserForm;
