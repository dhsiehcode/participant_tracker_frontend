"use client"; 
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';


function getReport() {

    const [formData, setFormData] = useState({
        start_date: '',
        end_date: '',
        researcher_id: '',
    });

    const [filteredExperiments, setFilteredExperiments] = useState([


    ]);
    const [selectedExperiment, setSelectedExperiment] = useState([]);

    const [experimentStatistics, setExperimentStatistics] = useState([

    ]);
    const [loading, setLoading] = useState(true); // Tracks the loading state


    const [researchers, setResearchers] = useState([]);
    const [selectedResearcher, setSelectedResearcher] = useState('');

    const router = useRouter();

    const goBack = () => {
      router.back(); // Navigate back to the previous page
    };


    useEffect(() => {
      const fetchResearchers = async () => {
        const apiUrl = 'http://127.0.0.1:8000/api/researchers/'; 
    
        fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then((response) => response.json())
          .then((data) => {
            setResearchers(data);
          })
          .catch((error) => {
            console.error('Error:', error);
            //alert('There was an error submitting the form.');
          });
      };
  
      fetchResearchers();
    }, []);

    const handleResearcherChange = (event) => {
      formData.researcher_id = event.target.value;
      //filterChange(event);
      setSelectedResearcher(event.target.value);
    };

    const filterChange = (e) => {
        const { name, value } = e.target;
        console.log(value);
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      const handleSubmitFilter = (e) => {
        e.preventDefault();
        const apiUrl = 'http://127.0.0.1:8000/api/filter_by_date_researcher/'; 
        console.log(formData);
    
        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        })
          .then((response) => response.json())
          .then((data) => {
            setFilteredExperiments(data);
            //alert('Form submitted successfully!');
          })
          .catch((error) => {
            console.error('Error:', error);
            //alert('There was an error submitting the form.');
          });
      };


      const handleSubmitExperiment = (experiment_id) => {
        //setFormExperimentID({...formExperimentID, ['experiment_id']: experiment_id})


        const apiUrl = "http://127.0.0.1:8000/api/get_report/";

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({'experiment_id':experiment_id
          })
        })
        .then((response) => response.json())
        .then((data) => {
          setExperimentStatistics(data);
          //alert('Form submitted successfully!');

          
        }).catch((error) => {
          console.error('Error:', error);
          //alert('There was an error subitting the form');
        }).finally(() => {
          setLoading(false);
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

          <h2 style={styles.header}>Date Range Form</h2>
          <form onSubmit={handleSubmitFilter} style={styles.form}>
            <label style={styles.label}>
              Start Date:
              <input
                type="date"
                name="start_date"
                value={formData.start_date}
                onChange={filterChange}
                required
                style={styles.input}
              />
            </label>
    
            <label style={styles.label}>
              End Date:
              <input
                type="date"
                name="end_date"
                value={formData.end_date}
                onChange={filterChange}
                required
                style={styles.input}
              />
            </label>
    
            <label style={styles.dropdown_label}>
                    <select
                id="researcher-select"
                value={selectedResearcher}
                onChange={handleResearcherChange}
                style={styles.dropdown_select}
              >
                <option value="">-- Select a Researcher --</option>
                {researchers.map((researcher) => (
                  <option key={researcher.id} value={researcher.id}>
                    {researcher.first_name + " " + researcher.last_name + "(id:" + researcher.id + ")"}
                  </option>
                ))}
              </select>
            </label>
    
            <button type="submit" style={styles.button}>
              Submit
            </button>
          </form>

          <div>

            { 
              filteredExperiments.length > 0 && 
              (
                <div style={styles.results}>

                    <h3 style={styles.resultsHeader}>Select Experiment</h3>

                    <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Description</th>
                <th style={styles.th}>Start Date</th>
                <th style={styles.th}>End Date</th>
                <th style={styles.th}>IRB Number</th>
                <th style={styles.th}>Select</th>
              </tr>
            </thead>
            <tbody>
              {filteredExperiments.map((experiment) => (
                <tr
                  key={experiment.id}
                  style={{
                    ...styles.row,
                    ...(selectedExperiment.includes(experiment.id)
                      ? styles.selectedRow
                      : {}),
                  }}
                >
                  <td style={styles.td}>{experiment.id}</td>
                  <td style={styles.td}>{experiment.name}</td>
                  <td style={styles.td}>{experiment.description}</td>
                  <td style={styles.td}>{experiment.start_date}</td>
                  <td style={styles.td}>{experiment.end_date}</td>
                  <td style={styles.td}>{experiment.irb_number}</td>
                  <td style={styles.td}>
                    <button
                      onClick={() => handleSubmitExperiment(experiment.id)}
                      style={styles.selectButton}
                    >
                      Select

                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

                </div>
              )  
            }

</div>

<div> 

            <h2 style={styles.report_header}>Report</h2>
            {

              loading ? (<p>  </p>): 
              (

                <div style={styles.results}>
                
                  <h3 style={styles.resultsHeader}>Experiment Results</h3>

                  <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>ID</th>
                <th style={styles.th}>First Name</th>
                <th style={styles.th}>Last Name</th>
                <th style={styles.th}>Date of Birth</th>
                <th style={styles.th}>Sex</th>
                <th style={styles.th}>Occupation</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Collect Data</th>
                <th style={styles.th}>Experiment Date</th>
                <th style={styles.th}>Location</th>
              </tr>
            </thead>
            <tbody>
              {experimentStatistics.participants.map((stat) => (
                <tr
                  key={stat.id}
                >
                  <td style={styles.td}>{stat.participant_id.id}</td>
                  <td style={styles.td}>{stat.participant_id.first_name}</td>
                  <td style={styles.td}>{stat.participant_id.last_name}</td>
                  <td style={styles.td}>{stat.participant_id.dob}</td>
                  <td style={styles.td}>{stat.participant_id.sex}</td>
                  <td style={styles.td}>{stat.participant_id.occupation}</td>
                  <td style={styles.td}>{stat.participant_id.email}</td>
                  <td style={styles.td}>{stat.collect_data ? "true": "false"}</td>
                  <td style={styles.td}>{stat.experiment_date}</td>
                  <td style={styles.td}>{stat.location}</td>


                  
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={styles.resultsHeader}>Experiment Statistics</h3>

          <table style={styles.table}>

          <thead>
              <tr>
                <th style={styles.th}>Data Collection Count</th>
                <th style={styles.th}>Email List Count</th>
                <th style={styles.th}>Data and Email Count</th>
                <th style={styles.th}>Male Count</th>
                <th style={styles.th}>Female Count</th>
              </tr>
            </thead>

            <tbody>
                <tr
                  key={'statistics'}
                >
                  <td style={styles.td}>{experimentStatistics.statistics.data_collection_count}</td>
                  <td style={styles.td}>{experimentStatistics.statistics.email_list_count}</td>
                  <td style={styles.td}>{experimentStatistics.statistics.data_and_email_count}</td>
                  <td style={styles.td}>{experimentStatistics.statistics.male_count}</td>
                  <td style={styles.td}>{experimentStatistics.statistics.female_count}</td>
                </tr>
            </tbody>



          </table>


                </div>

  
              )
            }


</div>


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
        maxWidth: '1400px',
        margin: '50px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
      },
      header: {
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      report_header: {
        marginTop: '30px',
        textAlign: 'center',
        marginBottom: '20px',
        color: '#333',
        fontSize: '20px',
        fontWeight: 'bold',
      },
      form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
      },
      label: {
        fontWeight: 'bold',
        color: '#555',
      },
      input: {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        fontSize: '16px',
      },
      button: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 'bold',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
      },
      results: {
        marginTop: '30px',
      },
      resultsHeader: {
        color: '#333',
        textAlign: 'center',
        marginBottom: '10px',
      },
      list: {
        listStyleType: 'none',
        padding: '0',
        margin: '0',
      },
      listItem: {
        padding: '10px',
        margin: '5px 0',
        border: '1px solid #ddd',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        backgroundColor: '#f9f9f9',
        transition: 'background-color 0.3s, color 0.3s',
      },
      selectedRow: {
        backgroundColor: '#cce5ff',
      },
      selectButton: {
        padding: '5px 10px',
        fontSize: '14px',
        color: '#fff',
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
      },

      table: {
        width: '100%',
        borderCollapse: 'collapse',
      },
      th: {
        padding: '10px',
        border: '1px solid #ddd',
        backgroundColor: '#007BFF',
        color: '#fff',
        textAlign: 'left',
      },
      td: {
        padding: '10px',
        border: '1px solid #ddd',
        textAlign: 'left',
      },
      row: {
        transition: 'background-color 0.3s',
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

export default getReport;