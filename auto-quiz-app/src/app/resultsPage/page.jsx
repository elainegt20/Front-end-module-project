'use client';

import Results from '../components/ResultsPanel/ResultsPanel';
import { clearQuizAnswers } from '../actions/quizActions';
import { useSearchParams } from 'next/navigation';
import UtilButton from '../components/Button/Button';
import { useRouter } from 'next/navigation';
import styles from './resultsPage.module.css';

const ResultsPage = () => {
  const searchParams = useSearchParams();
  const quizId = searchParams.get('id');
  const answers = searchParams.get('answers');

  const router = useRouter();

  const newQuiz = () => {
    router.push('/uploadNotesPage');
  };

  const retakeQuiz = async () => {
    await clearQuizAnswers(quizId);
    router.push(`/quizzesPage/${quizId}`);
  };

  return (
    <div className={styles.container}>
      <Results answers={answers} />
      <div className={styles.buttons}>
        <UtilButton color="black" backgroundColor="white" onClick={newQuiz}>
          New Quiz
        </UtilButton>
        <UtilButton color="black" backgroundColor="white" onClick={retakeQuiz}>
          Retake Quiz
        </UtilButton>
      </div>
    </div>
  );
};

export default ResultsPage;
