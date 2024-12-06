/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';

const Debits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [debits, setDebits] = useState([]); //add debits

  //fetch API data from fake
  useEffect( () => {
    //fetch('https://jsonplaceholder.typicode.com/posts')
    fetch('https://johnnylaicode.github.io/api/debits.json')
      .then(response => response.json())  // analysis JSON data
      .then(data => {
        setDebits(data.slice(0, 10)); // fetch the first ten data
        //setLoading(false); // set loading statement to be false
      })
      .catch(error=>{
        console.error('Error fetching credits:', error);
      });

  },[]);

  // Create the list of Debit items
  let debitsView = () => {
    // const { debits } = props;
    return debits.map((debit) => {  // Extract "id", "amount", "description" and "date" properties of each debits JSON array element
      let date = debit.date.slice(0,10);
      return <li key={debit.id}>{debit.amount} {debit.description} {date}</li>
    });
  }

// Handle form submission
const handleAddDebit = (e) => {
  e.preventDefault(); // Prevent page reload on form submit
  const newDebit = {
    id: Date.now(), // Unique ID based on current timestamp
    amount: parseFloat(amount),
    description,
    date: new Date().toISOString().slice(0, 10), // Get current date in yyyy-mm-dd format
  };
  // Update local debits and pass new debit to parent if function exists
  setDebits([newDebit, ...debits]);
  if (props.addDebit) {
    props.addDebit(newDebit);
  }

  setAmount(''); // Clear amount input field
  setDescription(''); // Clear description input field
  //this.props.addDebit(newDebit); //
};

  // Render the list of Debit items and a form to input new Debit item
  return (
    <div>
      <h1>Debits</h1>

    

    <form onSubmit={handleAddDebit}>
      <input
        type="text"
        name="description"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="number"
        name="amount"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        step="0.01" //better UX when entering decimal values.
        required
      />
      <button type="submit">Add Debit</button>
    </form>

    <ul>{debitsView()}</ul>

    <br />
    <Link to="/">Return to Home</Link>
    </div>
    
  );
}

export default Debits;