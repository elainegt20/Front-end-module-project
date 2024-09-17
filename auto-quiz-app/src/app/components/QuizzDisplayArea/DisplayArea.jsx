'use client';
import MenuList from '../sidebar/MenuList';
import Header from '../sidebar/Header';
import TitleSection from '../sidebar/TitleSection';
import SideBarContainer from '../sidebar/SideBarContainer';
import QuizzCard from '../QuizzCard/QuizzCard';
import React from 'react';
import styles from './DisplayArea.module.css';
import { useRouter } from 'next/navigation';

const DisplayArea = ({ data, setData }) => {
  const router = useRouter();
  const [answers, setAnswers] = React.useState({});

  const [completionStatus, setCompletionStatus] = React.useState(
    data.dashboard.map((topic) => ({
      topicCompleted: false,
      subtopics: topic.subtopics.map(() => false),
    })),
  );

  const handleQuestionComplete = (topicIndex, subtopicIndex, questionIndex) => {
    const newData = { ...data };
    const question =
      newData.dashboard[topicIndex].subtopics[subtopicIndex].questions[
        questionIndex
      ];
    question.completed = !question.completed;
    setData(newData);

    const newCompletionStatus = [...completionStatus];
    const subtopic = newData.dashboard[topicIndex].subtopics[subtopicIndex];
    const isSubtopicCompleted = subtopic.questions.every((q) => q.completed);
    newCompletionStatus[topicIndex].subtopics[subtopicIndex] =
      isSubtopicCompleted;

    const isTopicCompleted = newCompletionStatus[topicIndex].subtopics.every(
      (s) => s,
    );
    newCompletionStatus[topicIndex].topicCompleted = isTopicCompleted;

    setCompletionStatus(newCompletionStatus);
  };

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
          <MenuList data={data} completionStatus={completionStatus} />
        </SideBarContainer>
      </div>
      <div className={styles.navBarContainer}></div>
      <div className={styles.quizzContainer}>
        <QuizzCard
          data={data}
          setAnswers={setAnswers}
          onQuestionComplete={handleQuestionComplete}
        />
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
