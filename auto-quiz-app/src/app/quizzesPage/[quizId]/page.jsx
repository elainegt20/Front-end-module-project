import { getQuizById } from '../../actions/quizActions';
import React from 'react';

import QuizDetail from './QuizDetail';

export default async function QuizPage({ params }) {
  const data = await getQuizById(params.quizId);

  return (
    <>
      <QuizDetail quizData={data} />
    </>
  );
}
