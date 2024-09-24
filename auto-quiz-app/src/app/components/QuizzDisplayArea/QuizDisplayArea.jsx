'use client';
import MenuList from '../Sidebar/MenuList';
import TitleSection from '../Sidebar/TitleSection';
import SideBarContainer from '../Sidebar/SideBarContainer';
import QuizzCard from '../QuizzCard/QuizzCard';
import React from 'react';
import styles from './DisplayArea.module.css';
import { Typography } from '@mui/material';
import CheckModal from '../Modal/Modal';
import UtilButton from '../Button/Button';
import { useRouter } from 'next/navigation';

const QuizDisplayArea = ({ data, setData }) => {
  const router = useRouter();
  const [answers, setAnswers] = React.useState({});
  const [subtopic, setSubtopic] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  const [completionStatus, setCompletionStatus] = React.useState(
    data.dashboard.map((topic) => ({
      topicCompleted: false,
      subtopics: Array(topic.subtopics.length).fill(false),
    })),
  );

  const handleQuestionComplete = (topicIndex, subtopicIndex, questionIndex) => {
    const newData = { ...data };
    const question =
      newData.dashboard[topicIndex].subtopics[subtopicIndex].questions[
        questionIndex
      ];
    question.completed = true;
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

    if (totalQuestions !== Object.keys(answers).length) {
      setOpen(true);
      return;
    }

    localStorage.setItem('answers', JSON.stringify(Object.values(answers)));
    router.push('/pages/resultsPage');
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.sideBarContainer}>
        <SideBarContainer>
          {/* <Header /> */}
          <TitleSection data={data} />
          <MenuList
            data={data}
            completionStatus={completionStatus}
            setSubtopic={setSubtopic}
          />
        </SideBarContainer>
      </div>
      <div className={styles.navBarContainer}></div>
      <div className={styles.quizzContainer}>
        <QuizzCard
          data={data}
          setAnswers={setAnswers}
          onQuestionComplete={handleQuestionComplete}
          subtopic={subtopic}
        />
      </div>
      <footer className={styles.footer}>
        <UtilButton onClick={goToResults} color="black" backgroundColor="white">
          <Typography variant="h6" sx={{ color: 'black', fontWeight: 'bold' }}>
            Go to Results
          </Typography>
        </UtilButton>
        <CheckModal
          open={open}
          onClose={handleClose}
          message={
            'Please complete all questions before proceeding to results.'
          }
        />
      </footer>
    </div>
  );
};

export default QuizDisplayArea;
