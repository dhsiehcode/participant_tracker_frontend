"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


function UserForm() {
  const [formData, setFormData] = useState({
    id: '',
  });

  const [participations, setParticipation] = useState([]);
  const [selectedParticipation, setSelectedParticipation] = useState('');



  const router = useRouter();

  const goBack = () => {
    router.back(); // Navigate back to the previous page
  };

  useEffect(() => {
    const fetchParticipation = async () => {
      const apiUrl = 'https://participant-tracker-backend.onrender.com/api/participant_experiment/'; 
  
      fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then((response) => response.json())
        .then((data) => {
          setParticipation(data);
        })
        .catch((error) => {
          console.error('Error:', error);
          //alert('There was an error submitting the form.');
        });
    };

    fetchParticipation();
  }, []);

  const handleParticipationChange = (event) => {
    formData.id = event.target.value;
    //filterChange(event);
    setSelectedParticipation(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'https://participant-tracker-backend.onrender.com/api/participant_experiment/'.concat(formData['id']);

    fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        alert('Form submitted successfully!');
      })
      .catch((error) => {
        console.log('Deleted:', error);
        alert('Deleted.');
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
      <h2 style={styles.header}>Delete Participation</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        {/*<label style={styles.label}>
          Participation ID:
          <input
            type="text"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            style={styles.input}
          />
        </label>*/}

        <label style={styles.dropdown_label}>
                    <select
                id="participation-select"
                value={selectedParticipation}
                onChange={handleParticipationChange}
                style={styles.dropdown_select}
                required
              >
                <option value="">-- Select a Participation --</option>
                {participations.map((participation) => (
                  <option key={participation.id} value={participation.id}>
                    {"participation id: " + participation.id + ", participant id: " + participation.participant_id + ", experiment id: " + participation.experiment_id}
                  </option>
                ))}
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
  },
  dropdown_label: {
    font_size: '16px',
    font_weight: 'bold',
    margin_bottom: '10px',
    color: '#333'
  },
  dropdown_select: {
    width: '100%',
    padding: '10px',
    font_size: '14px',
    border: '1px solid #ccc',
    border_radius: '4px',
    background_color: '#fff',
    margin_bottom: '20px',
    transition: 'border-color 0.3s'
  }
};

export default UserForm;
