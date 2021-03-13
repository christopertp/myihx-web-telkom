import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/elements/Button';
import IconButton from '../../components/elements/IconButton';
import PdfViewer from '../../components/elements/PdfViewer';
import Spinner from '../../components/elements/Spinner';
import { fetchAccept, fetchDraftContract } from './actions';
import styles from './styles.scoped.css';

export default function DraftContract() {
  const dispatch = useDispatch();
  const { isLoading, message, url } = useSelector(s => s.draftContract);

  useEffect(() => {
    dispatch(fetchDraftContract());
  }, []);

  return (
    <section className={styles.root}>
      <header>
        <IconButton name="back_red" to="/" />
        <h1>Review Draft Contract</h1>
      </header>
      {(message !== 'Gagal memuat PDF') && <PdfViewer className={styles.pdf} url={url} />}
      {message && <small className={styles.error}>{message}</small>}
      <footer>
        <Button to="/" variant="bordered">Decline</Button>
        <Button disabled={!url || isLoading.s} onClick={() => dispatch(fetchAccept())}>
          {isLoading.s ? <Spinner /> : 'Accept'}
        </Button>
      </footer>
    </section>
  );
}
