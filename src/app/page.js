"use client"; 
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";


const Text = () => {
  const [text, setText] = useState('');
  const fetchText = async () => {
    try {
      const response = await fetch('https://participant-tracker-backend.onrender.com/api/', {
        method: 'GET'
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setText(data.text);
    } catch (error) {
      console.error('Error:', error);
    }
  }
  useEffect(() => {
    fetchText();
  }, []);
  return (
      <p>{text}</p>
  );
}






export default function Home() {

  const containerStyle = {
    display: 'flex',
    gap: '15px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '20px',
  };

  // Style object for general button styling
  const buttonStyle = {
    fontFamily: 'Arial, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    width: 'auto',
    minWidth: '120px',
  };

  // Variants for different button types
  const primaryStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: '#fff',
  };
  const header = {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333',
    fontSize: '20px',
    fontWeight: 'bold',
  };



  return (
    <div>

    <h1 style={header}>Home Page</h1>

    <div style={containerStyle}>

    <Link style={primaryStyle} href="/report">Go to report Page</Link>
    <br/>
    <Link style={primaryStyle} href="/add_participation">Add participation page</Link>
    <br/>
    <Link style={primaryStyle}  href="/remove_participation">Remove participation page</Link>
    <br />
    <Link style={primaryStyle}  href="/edit_participation">Edit participation page</Link>
    <br />
    <Link style={primaryStyle}  href="/get_participation">Get all participation</Link>
    <br/>
    </div>

    </div>

  );
}
