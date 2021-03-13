import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import SendFeedbackForm from '../../components/forms/SendFeedback';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import { fetchData, fetchSendFeedback } from './actions';

export default function SendFeedback() {
  const dispatch = useDispatch();
  const onSubmit = payload => {
    dispatch(fetchSendFeedback({ ...payload, apps: 'web' }));
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const subtitle = `Have any critiques or suggestions
  about our service or the app? We'd love to hear from you!`;

  return (
    <WhiteCardPlain back="/profile" subtitle={subtitle} title="Send Feedback">
      <SendFeedbackForm onSubmit={onSubmit} />
    </WhiteCardPlain>
  );
}
