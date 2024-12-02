'use client';
import { Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { saveQuizAnswers } from '../../actions/quizActions';
import MenuList from '../Sidebar/MenuList';
import TitleSection from '../Sidebar/TitleSection';
import SideBarContainer from '../Sidebar/SideBarContainer';
import QuizzCard from '../QuizzCard/QuizzCard';
import React from 'react';
import styles from './DisplayArea.module.css';
import CheckModal from '../Modal/Modal';
import UtilButton from '../Button/Button';

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

  const handleQuestionComplete = async (
    topicIndex,
    subtopicIndex,
    questionIndex,
  ) => {
    try {
      const newData = { ...data };
      const question =
        newData.dashboard[topicIndex].subtopics[subtopicIndex].questions[
          questionIndex
        ];
      question.completed = true;
      setData(newData);

      // handle sidebar completion status
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
    } catch (error) {
      console.error('Error completing question:', error);
    }
  };

  const goToResults = async () => {
    const totalQuestions = data.dashboard.reduce((acc, topic) => {
      return (
        acc +
        topic.subtopics.reduce((subAcc, subtopic) => {
          return subAcc + subtopic.questions.length;
        }, 0)
      );
    }, 0);

    console.log('Total questions:', totalQuestions);
    console.log('Answered questions:', Object.keys(answers).length);

    const allQuestionsAnswered = data.dashboard.every((topic) =>
      topic.subtopics.every((subtopic) =>
        subtopic.questions.every(
          (question) => answers[question.global_question_index] !== undefined,
        ),
      ),
    );

    if (!allQuestionsAnswered) {
      setOpen(true);
      return;
    }

    await saveQuizAnswers(data.id, JSON.stringify(answers));

    router.push(
      `/resultsPage?id=${data.id}&answers=${encodeURIComponent(JSON.stringify(answers))}`,
    );
    router.refresh();
  };

  React.useEffect(() => {
    if (data.answers) {
      console.log('Data answers 1:', data.answers);

      // set completion status based on previous answers
      const newCompletionStatus = data.dashboard.map((topic) => ({
        topicCompleted: topic.subtopics.every((sub) =>
          sub.questions.every((q) => data.answers[q.global_question_index]),
        ),
        subtopics: topic.subtopics.map((sub) =>
          sub.questions.every((q) => data.answers[q.global_question_index]),
        ),
      }));
      setCompletionStatus(newCompletionStatus);

      setAnswers(data.answers);

      setData((prevData) => {
        return {
          ...prevData,
          dashboard: prevData.dashboard.map((topic, topicIndex) => {
            return {
              ...topic,
              subtopics: topic.subtopics.map((subtopic, subtopicIndex) => {
                return {
                  ...subtopic,
                  questions: subtopic.questions.map((question) => {
                    return {
                      ...question,
                      completed: data.answers[question.global_question_index]
                        ? true
                        : false,
                    };
                  }),
                };
              }),
            };
          }),
        };
      });
    }
  }, [data.id]);

  return (
    <div className={styles.parentContainer}>
      <div className={styles.sideBarContainer}>
        <SideBarContainer>
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
          answers={answers}
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
