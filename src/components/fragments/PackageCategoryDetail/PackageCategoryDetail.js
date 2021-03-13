import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import Card from '../../elements/Card';
import Heading from '../../elements//Heading';
import Button from '../../elements/Button';
import IconButton from '../../elements/IconButton';
import Modal from '../../elements/Modal';
import PackageCategoryList from '../PackageCategoryDetailPackage';
import styles from './styles.scoped.css';

export default function PackageCategoryDetail() {

  const { isLoading } = useSelector(s => s.packageCategory);

  if(isLoading.d){
    return <Loading />;
  }

  return (
    <article className={styles.root}>
      <Header />
      <Benefit />
      <PackageCategoryList />
      <Tnc />
    </article>
  );
}

export function Loading() {
  return (
    <div className={styles.isloading}>
      <div className="loading" />
      <div>
        {
          [...Array.from({ length: 3 }).keys()].map((i) => (
            <span className="loading" key={i}/>
          ))
        }
      </div>
    </div>
  );
}

export function Header() {

  const { benefitCategory } = useSelector(s => s.packageCategory);
  const { category } = useParams();

  const bgColor = 'linear-gradient(120deg, rgba(0, 0, 0, .5), rgba(0, 0, 0, .2), rgba(0, 0, 0, 0))';
  const imgUrl = benefitCategory.imageCategory.web;

  return (
    <header className={styles.header}>
      <section style={{ backgroundImage: `${bgColor}, url(${imgUrl})` }}>
        <Link to="/shop/internet/package/category">
          <img alt="back to shop" src="/assets/ic_back_white.svg" />
          <img alt="back to shop" src="/assets/ic_back_red.svg" />
          Back
        </Link>
        <h1>{category}</h1>
        <p>Paket Indihome {category}</p>
      </section>
    </header>
  );
}

export function Benefit() {

  const { benefitCategory } = useSelector(s => s.packageCategory);
  const [ modalPackageCategory, setModalPackageCategory ] = useState(-1);

  return (
    <section className={styles.benefit}>
      <Heading>Special Benefits</Heading>
      <ul>
        {
          benefitCategory.specialBenefit.map((item, i) => (
            <Card  key={i} onClick={() => setModalPackageCategory(i)} variant="hover">
              <img alt="benefit" src={item.imageTitleUrl}/>
              <p>{item.description}</p>
              <img alt="icon" src="/assets/ic_chevron_red.svg"/>
            </Card>
          ))
        }
      </ul>
      <ModalPackageCategory
        idx={modalPackageCategory}
        onClose={() => setModalPackageCategory(-1)}
      />
    </section>
  );
}

export function Tnc() {

  const { termsCategory } = useSelector(s => s.packageCategory);

  return (
    <section className={styles.tnc}>
      <Heading>Terms & Conditions</Heading>
      <ol>
        {
          termsCategory.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        }
      </ol>
    </section>
  );
}

export function ModalPackageCategory(props) {

  const { benefitCategory, benefitInfo } = useSelector(s => s.packageCategory);
  const { idx, onClose } = props;

  return (
    <Modal className={styles.modal} onClose={onClose} open={idx > -1}>
      <header>
        <h1>{idx > -1 && benefitCategory.specialBenefit[idx].description}</h1>
        <IconButton name="close_red" onClick={onClose} />
      </header>
      <ul>
        {
          benefitInfo.length > 1
            ? benefitInfo.map((item, i) => (
              <li key={i}>
                <Card variant="bordered">
                  <img alt="benefit" src={item.imageUrl}/>
                </Card>
                <article>
                  <p>{item.benefit}</p>
                  <ul>
                    {item.description.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </article>
              </li>
            ))
            : <p>{benefitInfo[0].description.join(' ')}</p>
        }
      </ul>
      {benefitInfo.length > 1 && <Button to="/help" >How to Redeem</Button>}
    </Modal>
  );
}

ModalPackageCategory.propTypes = {
  idx: PropTypes.number.isRequired,
  onClose: PropTypes.func.isRequired,
};
