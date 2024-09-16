'use client';
import MenuList from '../sidebar/MenuList';
import Header from '../sidebar/Header';
import TitleSection from '../sidebar/TitleSection';
import SideBarContainer from '../sidebar/SideBarContainer';
import QuizzCard from '../QuizzCard/QuizzCard';
import React from 'react';
import styles from './DisplayArea.module.css';
import { useRouter } from 'next/navigation';

const DisplayArea = ({ data }) => {
  const router = useRouter();
  const [answers, setAnswers] = React.useState({});

  const goToResults = () => {
    const totalQuestions = data['dashboard'].reduce((acc, curr) => {
      return (
        acc +
        curr.subtopics.reduce((acc, curr) => {
          return acc + curr.questions.length;
        }, 0)
      );
    }, 0);

    console.log(answers);
    console.log('totalQuestions:', totalQuestions);
    console.log('answers:', answers);
    if (totalQuestions !== Object.keys(answers).length) {
      alert('Please answer all questions before proceeding');
      return;
    }

    localStorage.setItem('answers', JSON.stringify(Object.values(answers)));
    router.push('/resultsPage');
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.sideBarContainer}>
        <SideBarContainer>
          <Header />
          <TitleSection />
          <MenuList data={data} />
        </SideBarContainer>
      </div>
      <div className={styles.navBarContainer}></div>
      <div className={styles.quizzContainer}>
        <QuizzCard data={data} setAnswers={setAnswers} />
      </div>
      <footer className={styles.footer}>
        <button className={styles.button} onClick={goToResults}>
          go to results
        </button>
      </footer>
    </div>
  );
};

export default DisplayArea;
