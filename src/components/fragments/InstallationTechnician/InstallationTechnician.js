import React from 'react';
import { useSelector } from 'react-redux';
import Heading from '../../elements/Heading';
import styles from './styles.scoped.css';

export default function InstallationTechnician() {
  const { isLoading, technician } = useSelector(s => s.installation);
  const setContent = (value) => {
    if (!isLoading.d && !technician) {
      return '';
    }
    return isLoading.d ? <span className="loading" /> : value;
  };

  return (
    <section className={styles.root}>
      <Heading>Your Technician</Heading>
      <header>
        {setContent(
          <figure>
            <img alt="" src="/assets/av_blank.svg" />
          </figure>
        )}
        {setContent(<h3>{technician.displayName}</h3>)}
        {setContent(<p>On the way</p>)}
        {setContent(
          <aside>
            <a href={`sms:${technician.phone}`}>
              <img alt="" src="/assets/ic_chat.svg" />
            </a>
            <a href={`tel:${technician.phone}`}>
              <img alt="" src="/assets/ic_call.svg" />
            </a>
          </aside>
        )}
      </header>
    </section>
  );
}
