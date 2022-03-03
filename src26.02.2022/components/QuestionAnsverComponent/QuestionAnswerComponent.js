import React, { useEffect, useState } from 'react';
import { FetcherList, dataStates } from '@garpix/fetcher';
import api from '../../api';
import VidjetChatViews from '../../Views/VidjetChatViews';

const apiContent = api.contentApi;


const QuestionAnswerComponent = () => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    apiContent
      .getAnswers()
      .then((res) => {
        setAnswers(res.results);
      })
      .catch((err) => {});
  }, []);

  return (
    <>
      {/* ? <p>Ничего не найдено!</p> : null */}
      {(answers.lendth === 0) === !answers.lendth ? <p>Ничего не найдено!</p> : null}
      {answers.map((answer, i) => {
        return (
          <VidjetChatViews.AnsverChatComponent
            key={answer.id}
            answer={answer.answer}
            question={answer.question}
          />
        );
      })}
    </>
  );
};

export default React.memo(QuestionAnswerComponent);

