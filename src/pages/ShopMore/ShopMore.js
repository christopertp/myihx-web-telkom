import React, { createContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Menu from '../../components/elements/ShopCategoryMenu';
import HboGo from '../../components/fragments/ShopMoreHboGo';
import { fetchHboGo } from './actions';

const Context = createContext({});

export default function ShopMore() {
  const { page } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHboGo());
    !page && history.replace('/shop/more/hbo-go');
  }, []);

  const links = [
    { page: 'cloud-storage', to: '#', text: 'Cloud Storage' },
    { page: 'indihome-study', to: '#', text: 'Indihome Study' },
    { page: 'indihome-smart', to: '#', text: 'Indihome Smart' },
    { page: 'hbo-go', to: '/shop/more/hbo-go', text: 'HBO GO' },
  ];

  return (
    <Context.Provider>
      <Menu
        links={links}
        title="More"
      />
      {
        (() => {
          return <HboGo />;
        })()
      }
    </Context.Provider>
  );
}
