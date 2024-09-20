'use client';

import Results from '../../components/ResultsPanel/ResultsPanel';
import UtilButton from '../../components/Button/Button';
import { useRouter } from 'next/navigation';
import styles from './resultsPage.module.css';

const ResultsPage = () => {
  const router = useRouter(); // Initialize the router

  // Function to handle button click and navigate to the results page
  const newQuiz = () => {
    router.push('/'); // Navigate to the results page
  };
  const retakeQuiz = () => {
    router.push('/pages/quizPage'); // Navigate to the results page
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
