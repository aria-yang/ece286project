import { db, collection, addDoc } from './config/firebase';
import React, { useState } from 'react';

const UserForm = () => {
  const [grade, setGrade] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [period, setPeriod] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission status

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get reference to 'users' collection
      const userCollection = collection(db, 'users');  // 'users' is the Firestore collection name

      // Add user data to Firestore
      await addDoc(userCollection, {
        grade: grade,
        courseCode: courseCode,
        period: period,
      });

      // Mark the form as submitted
      setIsSubmitted(true);

      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      {!isSubmitted ? ( // Show the form only if not submitted
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Grade"
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
          />
          <input
            type="text"
            placeholder="Course Code"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
          <input
            type="text"
            placeholder="Period of Day"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          <button type="submit">Submit</button>
        </form>
      ) : (
        <p>Thank you for submitting your data!</p> // Show a message after submission
      )}
    </div>
  );
};

export default UserForm;
