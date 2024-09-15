
'use client'

import Results from "../components/resultsPanel/Results"
import { useRouter } from 'next/navigation';

const ResultsPage = () => {

    const router = useRouter(); // Initialize the router

  // Function to handle button click and navigate to the results page
  const newQuiz = () => {
    router.push('/'); // Navigate to the results page
  };
  const retakeQuiz = () => {
    router.push('/quizPage'); // Navigate to the results page
  };
    return (
        <div>
        <Results />
        <button onClick={newQuiz}>take another quiz</button>
        <button onClick={retakeQuiz}>retake quiz</button>
        </div>
    )
}

export default ResultsPage