import React, { useState, useEffect } from 'react';
import { GxIcon } from '@garpix/garpix-web-components-react';
import { chats } from '../../images';
import VidjetChatViews from '../../Views/VidjetChatViews';
import { useStoreon } from 'storeon/react';
import api from '../../api';

const contentApi = api.contentApi;
const VidjetChatComponent = ({}) => {
  const [answers, setanswers] = useState([]);
  const [answerCategorys, setanswerCategorys] = useState([]);
  const [successResponse, setsuccessResponse] = useState(null);
  const { dispatch, faq } = useStoreon('faq');
  const [isShowChat, setisShowChat] = useState(faq.show);
  const toggleOpenChats = () => {
    setisShowChat(!isShowChat);
  };

  const submitQuestrion = (data) => {
    const params = {
      name: data.name,
      email: data.email,
      category: data.category,
      question: data.question,
    };
    contentApi.postAnswer(params).then((res) => {
      setsuccessResponse(res.email);
    });
  };

  useEffect(() => {
    dispatch('faq/update', {
      show: isShowChat,
    });
  }, [isShowChat]);

  useEffect(() => {
    setisShowChat(faq.show);
  }, [faq]);

  useEffect(() => {
    contentApi.getAnswers().then((res) => {
      setanswers(res.results);
    });
    contentApi.getCategoryAnswer().then((res) => {
      setanswerCategorys(res);
    });
  }, []);

  if (!isShowChat) {
    return <GxIcon onClick={toggleOpenChats} className={'chats-icon'} src={chats} alt={'chat'} />;
  }

  return (
    <VidjetChatViews.Wrapper>
      <VidjetChatViews.HeadChat toggleOpenChats={toggleOpenChats} />
      <VidjetChatViews.FieldsChat
        answers={answers}
        categorys={answerCategorys}
        successResponse={successResponse}
        submitQuestrion={submitQuestrion}
      />
      {/* <VidjetChatViews.SendChat /> */}
    </VidjetChatViews.Wrapper>
  );
};

export default React.memo(VidjetChatComponent);
