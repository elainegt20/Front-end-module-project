'use client';

import React, { useEffect, useState } from 'react';
import DisplayArea from '../../components/QuizzDisplayArea/QuizDisplayArea';

const QuizAreaPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem('quizData'); // Make sure this key matches the one used in FileUploader
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
        } catch (error) {
          console.error('Error parsing stored data:', error);
          setData(null);
        }
      }
    };

    fetchData();

    // Add event listener for storage changes
    window.addEventListener('storage', fetchData);

    // Cleanup function
    return () => {
      window.removeEventListener('storage', fetchData);
    };
  }, []);

  return (
    <main>
      {data ? (
        <DisplayArea data={data} setData={setData} />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
          }}
        >
          <h1>Invalid Data</h1>
        </div>
      )}
    </main>
  );
};

export default QuizAreaPage;
