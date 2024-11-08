import { useState } from 'react';
import { greeting_backend } from 'declarations/greeting_backend';

function App() {
  const [greeting, setGreeting] = useState('');
  const [name, setName] = useState();
  const [nameList, setNameList] = useState();
  const handleChange = (event) => {
    setName(event.target.value);
  };

  function handleSubmit(event) {
    event.preventDefault();
    console.log(name);
    greeting_backend.greet(name).then((greeting) => {
      setGreeting(greeting); 
    });
    return false;
  }

  function getSubmitedNames() {
    greeting_backend.submittedNames().then(result => {
      console.log(result);
      setNameList(result);
    }) 
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Enter Your Name</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={styles.label}>
          Name:
          <input
            type="text"
            value={name}
            onChange={handleChange}
            placeholder="Enter your name"
            style={styles.input}
          />
        </label>
        <button type="submit" style={styles.button}>
          Submit
        </button>
        <div>{ greeting }</div>
      </form>

       {/* Display the list of names */}
      <h2 style={styles.listHeading}>Name List</h2>
      <ul style={styles.list}>
        {nameList?.map((item, index) => (
          <li key={index} style={styles.listItem}>{item}</li>
        ))}
        <button onClick={getSubmitedNames} style={styles.button}>
          Submit
        </button>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '10px',
  },
  label: {
    fontSize: '16px',
    color: '#555',
  },
  input: {
    padding: '8px 12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    marginTop: '5px',
    width: '200px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  listHeading: {
    marginTop: '30px',
    fontSize: '20px',
    color: '#333',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
  },
  listItem: {
    padding: '8px 0',
    fontSize: '18px',
    color: '#555',
  },
};

export default App;
