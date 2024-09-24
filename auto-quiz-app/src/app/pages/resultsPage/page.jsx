'use client';

import Results from '../../components/ResultsPanel/ResultsPanel';
import UtilButton from '../../components/Button/Button';
import { useRouter } from 'next/navigation';
import styles from './resultsPage.module.css';

const ResultsPage = () => {
  const router = useRouter();

  const newQuiz = () => {
    router.push('/');
  };
  const retakeQuiz = () => {
    router.push('/pages/quizPage');
  };
  return (
    <div className={styles.container}>
      <Results />
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
