/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { useState, useEffect }  from 'react';
//useState: Stores the state in the component, and the state can be updated by setState
// useEffect: Perform side effects such as data requests, subscriptions, manual DOM manipulation, and so on.
import {Link} from 'react-router-dom';

const Credits = (props) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [credits, setCredits] = useState([]); //store credit history
  //const [loading, setLoading] = useLoading(true); //loaded state

  //fetch API data from fake
  useEffect( () => {
    //fetch('https://jsonplaceholder.typicode.com/posts')
    fetch('https://johnnylaicode.github.io/api/credits.json')
      .then(response => response.json())  // analysis JSON data
      .then(data => {
        setCredits(data.slice(0, 10)); // fetch the first ten data
        //setLoading(false); // set loading statement to be false
      })
      .catch(error=>{
        console.error('Error fetching credits:', error);
      });

  },[]);

  //new function to update credit
  const addCredit = () => {
    const newCredit = {
      title: description,
      body: `Amount: $${amount}`,
      amount: parseFloat(amount),
      date: new Date().toISOString().split('T')[0], // Get current date in yyyy-mm-dd format
    };
    setCredits([newCredit,...credits]); // Add the new credit at the beginning of the credits list
    setAmount('');  // Clear description input field
    setDescription(''); // Clear amount input field
    //this.props.addCredit(newCredit); //
    props.addCredit(newCredit); //
  };

  //return react
  return (
    <div>
      <h1>Credits</h1>

      <div>
        {/* Description input */}
        <input
          type = 'text'
          placeholder = "Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Update description state
        />

        {/* Amount input */}
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)} // Update amount state
        />

        {/* Add Credit button */}
        <button onClick={addCredit}>Add Credit</button>

      <h3>Credit List</h3>
        <ul>
          {/* Render the list of credits */}
          {credits.map((credit, index) => (
            <li key={index}>
              <p>{credit.title}</p>   {/* Description */}
              <p>{credit.body}</p>  {/* Amount */}
              <p>Date: {credit.date}</p>  {/* Date */}
            </li>
          ))}
        </ul>

      </div>


      <br/>
      <Link to="/">Return to Home</Link>
    </div>
  );
}

export default Credits;