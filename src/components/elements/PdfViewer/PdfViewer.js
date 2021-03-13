import React, { useEffect, useRef } from 'react';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.entry';
import PropTypes from 'prop-types';
import { remToPx } from '../../../utils/unit';
import styles from './styles.scoped.css';

export default function PdfViewer(props) {
  const { className, url } = props;
  const classes = [styles.root, className, 'loading'].filter(Boolean).join(' ');
  const ref = useRef(null);

  useEffect(() => {
    (async () => {
      if (!url) {
        return;
      }

      GlobalWorkerOptions.workerSrc = pdfjsWorker;

      const pdf = await getDocument(url).promise;
      const pages = [...Array.from({ length: pdf.numPages }).keys()];

      const clientWidth = ref.current.clientWidth - (2 * remToPx(1));
      ref.current.innerHTML = '';

      pages.reduce(async (acc, i) => {
        await acc;

        const page = await pdf.getPage(i + 1);
        const { width } = page.getViewport({ scale: 1 });
        const viewport = page.getViewport({ scale: clientWidth / width });

        const canvas = document.createElement('canvas');
        const devicePixelRatio = window.devicePixelRatio || 1;
        const transform = [ devicePixelRatio, 0 , 0, devicePixelRatio, 0, 0];

        canvas.width = viewport.width * devicePixelRatio;
        canvas.height = viewport.height * devicePixelRatio;
        ref.current.appendChild(canvas);

        const canvasContext = canvas.getContext('2d');
        const renderTask = page.render({ canvasContext, transform, viewport });

        return renderTask.promise;
      }, Promise.resolve());
      ref.current.classList.remove('loading');
    })();
  }, [url]);

  return <div className={classes} ref={ref} />;
}

PdfViewer.defaultProps = {
  className: '',
  url: '',
};

PdfViewer.propTypes = {
  className: PropTypes.string,
  url: PropTypes.string,
};
