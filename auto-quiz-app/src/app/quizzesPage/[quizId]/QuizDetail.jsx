'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import CheckModal from '../../components/Modal/Modal';
import QuizDisplayArea from '../../components/QuizzDisplayArea/QuizDisplayArea';

export default function QuizDetail({ quizData }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      console.log('Quiz data:', quizData);

      if (quizData) {
        try {
          setData(quizData.data);
          setOpen(false);
        } catch (error) {
          console.error('Error parsing stored data:', error);
          setData(null);
          setOpen(true);
        }
      } else {
        setOpen(true);
      }
    };

    fetchData();
  }, []);

  const handleClose = () => {
    setOpen(false);
    router.push('/uploadNotesPage');
  };

  return (
    <main>
      {data ? (
        <QuizDisplayArea data={data} setData={setData} />
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
}
