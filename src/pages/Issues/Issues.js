import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import Avatar from '../../components/elements/Avatar';
import Button from '../../components/elements/Button';
import Card from '../../components/elements/Card';
import Heading from '../../components/elements/Heading';
import Modal from '../../components/elements/Modal';
import DetailStatus from '../../components/fragments/IssuesDetailStatus';
import CommentForm from '../../components/forms/IssuesComment';
import Rate from '../../components/icons/Rate';
import WhiteCardPlain from '../../components/layouts/WhiteCardPlain';
import WhiteCardSuccessPlain from '../../components/layouts/WhiteCardSuccessPlain';
import { AppContext } from '../../contexts';
import { fetchComments, fetchData, fetchPostComment } from './actions';
import { SET_STEP } from './constants';
import styles from './styles.scoped.css';

const Context = createContext({});

export default function Issues() {
  const { id } = useParams();
  const [modal, setModal] = useState('');
  const [notif, setNotif] = useState('');

  const contextValue = {
    modal, setModal,
    notif, setNotif,
  };

  return (
    <Context.Provider value={contextValue}>
      {!id ? <h1>List Issues</h1> : <Detail />}
      <Notif />
      <Overlay />
    </Context.Provider>
  );
}

export function Detail() {
  const { modal, setModal } = useContext(Context);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();
  const { comments, message, step, technician, type } = useSelector(s => s.issues);
  const isLogic = type === 'logic';
  const showAction = (isLogic && step === 1) || (!isLogic && step === 2);

  const onClose404 = () => {
    setModal('');
    (modal === '404') && history.push('/issues');
  };

  const onSubmitComment = v => {
    dispatch(fetchPostComment(id, v.message, () => setModal('')));
  };

  useEffect(() => {
    dispatch(fetchData(id));
    dispatch(fetchComments(id));
  }, [id]);

  useEffect(() => {
    (message === '404') && setModal('404');
  }, [message]);

  if (step === -1) {
    return <Closed />;
  }

  return (
    <WhiteCardPlain title="Issue Report">
      <DetailStatus />
      {(step < 4) && <AddComment />}
      {!!comments.length && <Comments />}
      {showAction && <Action />}
      <Modal className={styles['modal-404']} onClose={onClose404} open={modal === '404'}>
        <img alt="" src="/assets/grfx_warning.svg" />
        <h3>Ticket not found</h3>
        <Button to="/issues">Browse Ticket History</Button>
      </Modal>
      <Modal className={styles['modal-comment']} onClose={onClose404} open={modal === 'comment'}>
        <h3>Add Comment</h3>
        <p>Have any other issues regarding this ticket?</p>
        <CommentForm onSubmit={onSubmitComment} />
      </Modal>
      <Modal className={styles['modal-solved']} onClose={onClose404} open={modal === 'solved'}>
        <img alt="" src="/assets/grfx_rate.svg" />
        <h3>Issue Solved!</h3>
        <p>We’re glad your issue is solved! Please take a few seconds to rate your technician</p>
        <Card variant="hover">
          <Avatar src="/assets/av_blank.svg" />
          <h4>{technician.name}</h4>
          <div>
            {[...Array.from({ length: 5 }).keys()].map(i => (
              <Rate key={i} size={40} />
            ))}
          </div>
        </Card>
        <Button to="/issues">Done</Button>
      </Modal>
    </WhiteCardPlain>
  );
}

export function AddComment() {
  const { setModal } = useContext(Context);
  return (
    <section className={styles['add-comment']}>
      <Heading>Add Comments</Heading>
      <button onClick={() => setModal('comment')}>
        <img alt="comment" src="/assets/ic_comment.svg" />
        <div>
          <h4>Additional Comments</h4>
          <p>Have any additional comments regarding this ticket? Add comment.</p>
        </div>
        <img alt="" src="/assets/ic_chevron_white.svg" />
      </button>
    </section>
  );
}

export function Comments() {
  const { comments } = useSelector(s => s.issues);
  return (
    <section className={styles.comments}>
      <Heading>Comment History</Heading>
      <ul>
        {comments.map((i, idx) => (
          <li key={idx}>
            <small>{i.date}</small>
            <p>{i.message}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Action() {
  const { setModal } = useContext(Context);
  const dispatch = useDispatch();

  const onClickNo = () => {
    dispatch({ step: -1, type: SET_STEP });
  };

  return (
    <footer className={styles.action}>
      <small>Is your problem solved?</small>
      <Button onClick={onClickNo} variant="bordered">No</Button>
      <Button onClick={() => setModal('solved')}>Yes</Button>
    </footer>
  );
}

export function Closed() {
  const { setNotif } = useContext(Context);
  const dispatch = useDispatch();
  const title = 'We\'re sorry to hear that';
  const subtitle = `We're sorry to hear that your issue hasn't been solved.
    It will help if you give a detailed description of the issue you are facing,
    and our team will help you further`;

  const onClick = () => {
    dispatch({ step: 1, type: SET_STEP });
    setNotif('Ticket successfully reopened!');
  };

  return (
    <WhiteCardSuccessPlain close="/issues" icon="sad" subtitle={subtitle} title={title}>
      <div className={styles.closed}>
        <textarea placeholder="Enter comment or message (optional)" />
        <Button onClick={onClick}>Reopen Issue</Button>
      </div>
    </WhiteCardSuccessPlain>
  );
}

export function Notif() {
  const { setNotif } = useContext(AppContext);
  const { notif } = useContext(Context);

  useEffect(() => {
    setNotif(notif);
  }, [notif]);

  return null;
}

export function Overlay() {
  const { setOverlay } = useContext(AppContext);
  const { isLoading } = useSelector(s => s.issues);

  useEffect(() => {
    setOverlay(isLoading.p);
  }, [isLoading.p]);

  return null;
}
