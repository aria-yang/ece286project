import { db, collection, addDoc } from './config/firebase';
import React, { useState } from 'react';

const UserForm = ({ score, timeTaken, setUserDataSubmitted }) => {
  const [grade, setGrade] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [period, setPeriod] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Get reference to 'users' collection
      const userCollection = collection(db, 'users');

      // Add user data to Firestore
      await addDoc(userCollection, {
        grade: grade,
        courseCode: courseCode,
        period: period,
        score: score,          // Add score to the document
        timeTaken: timeTaken,  // Add timeTaken to the document
      });

      // Mark the form as submitted
      setIsSubmitted(true);
      setUserDataSubmitted(true);  // Notify parent that data is submitted

      alert('Data saved successfully!');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div>
      {!isSubmitted ? (
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
        <p>Form submitted!</p>
      )}
    </div>
  );
};

export default UserForm;
