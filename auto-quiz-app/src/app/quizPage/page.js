'use client';
import DisplayArea from '../components/QuizzDisplayArea/DisplayArea';
import React from 'react';
import { useRouter } from 'next/router';

const quizAreaPage = () => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    const storedData = localStorage.getItem('data');
    if (storedData) {
      setData(JSON.parse(storedData)); // Parse and set the data from localStorage  //dashboard: {{topic: "Science", subtopics: Array(2)}, {topic: "Mathematics", subtopics: Array(1)}]
    }
  }, []);

  console.log(data);
  return (
    <main>
      {' '}
      {data && Array.isArray(data.dashboard) ? (
        <DisplayArea data={data} />
      ) : (
        <div>Loading or Invalid Data</div>
      )}
    </main>
  );
};

export default quizAreaPage;
