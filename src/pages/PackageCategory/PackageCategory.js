import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PackageCategoryDetail from '../../components/fragments/PackageCategoryDetail';
import Arrow from '../../components/icons/Arrow';
import { fetchPackageCategory, fetchpackageDetail, resetData } from './actions';
import styles from './styles.scoped.css';

export default function PackageCategory() {
  const dispatch = useDispatch();
  const { category } = useParams();
  const { categoryList, isLoading } = useSelector(s => s.packageCategory);

  useEffect(() => {
    dispatch(category ? fetchpackageDetail(category) : fetchPackageCategory());
    return () => {
      dispatch(resetData());
    };
  }, [category]);

  if(category) {
    return <PackageCategoryDetail />;
  }

  if(isLoading.l) {
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

  return (
    <>
      <header className={styles.header}>
        <Link to="/shop/internet">
          <Arrow fill="#333333" />
          <Arrow fill="#FFFFFF" />
          Internet Packages
        </Link>
        <h1>All Packages</h1>
        <h4>Browse all packages to find the perfect fit for you!</h4>
      </header>
      <article className={styles.grid}>
        {
          categoryList.map((item, i) => item.active && (
            <Link key={i} to={`/shop/internet/package/category/${item.packageName}`}>
              <img alt="category" src={item.imageUrl.apps}/>
            </Link>
          ))
        }
      </article>
    </>
  );
}
