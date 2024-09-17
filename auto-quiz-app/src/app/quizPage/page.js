'use client';

import React, { useEffect, useState } from 'react';
import DisplayArea from '../components/QuizzDisplayArea/DisplayArea';

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
      {data && Array.isArray(data.dashboard) ? (
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
          <p style={{ fontSize: '1.25rem' }}>Loading or Invalid Data</p>
        </div>
      )}
    </main>
  );
};

export default QuizAreaPage;
