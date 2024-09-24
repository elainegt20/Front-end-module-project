'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CheckModal from '../../components/Modal/Modal';
import DisplayArea from '../../components/QuizzDisplayArea/QuizDisplayArea';

const QuizAreaPage = () => {
  const router = useRouter();
  const [data, setData] = useState(null);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    router.push('/');
  };

  useEffect(() => {
    const fetchData = () => {
      const storedData = localStorage.getItem('quizData'); // Make sure this key matches the one used in FileUploader
      if (storedData) {
        try {
          const parsedData = JSON.parse(storedData);
          setData(parsedData);
          setOpen(false);
        } catch (error) {
          console.error('Error parsing stored data:', error);
          setData(null);
          setOpen(true);
        }
      } else {
        setOpen(true); // Open the modal if no data is found
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
          <CheckModal
            open={open}
            onClose={handleClose}
            message={'Invalid Data'}
          />
        </div>
      )}
    </main>
  );
};

export default QuizAreaPage;
