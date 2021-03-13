import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import { thousand } from '../../../utils/format';
import styles from './styles.scoped.css';

export default function PackageDetailMenu(props) {
  const { onClickSubscribe, onClickDetail } = props;
  const { isLoading, data } = useSelector(s => s.packageDetail);
  const { productInfo } = data;

  return (
    <header className={styles.root}>
      <section>
        <Link to="/shop/internet">
          <img alt="back white" src="/assets/ic_back_white.svg" />
          Shop / Internet package
        </Link>
        <div>
          <h1>{data.productName}</h1>
          <p>{data.productDescription}</p>
          <Link to="">
            Learn more about internet speed
            <img alt="chevron white" src="/assets/ic_chevron_white.svg" />
          </Link>
          <aside>
            <h3>Rp{thousand(data.discountPrice)}<small> /month</small></h3>
            <Link onClick={onClickDetail} to="#">
              View Pricing Detail
              <img alt="chevron red" src="/assets/ic_chevron_red.svg" />
            </Link>
            <Button disabled={isLoading.submit} onClick={onClickSubscribe}>
              {isLoading.submit ? <Spinner /> : 'Subscribe'}
            </Button>
          </aside>
        </div>
      </section>
      <ul>
        {
          isLoading.data
            ? [...Array.from({ length: 2 }).keys()].map(i => <li className="loading" key={i} />)
            : productInfo.map((i, idx) =>(
              <li key={idx}>
                <aside>
                  <h3>{i.value}</h3>
                  <span>{i.unit}</span>
                </aside>
                <h5>{i.name}</h5>
                <span>{i.description}</span>
              </li>
            ))
        }
      </ul>
    </header>
  );
}

PackageDetailMenu.defaultProps = {
  onClickDetail: () => { },
  onClickSubscribe: () => { },
};

PackageDetailMenu.propTypes = {
  onClickDetail: PropTypes.func,
  onClickSubscribe: PropTypes.func,
};
