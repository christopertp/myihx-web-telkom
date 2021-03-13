import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import MenuHelp from '../../icons/MenuHelp';
import MenuHistory from '../../icons/MenuHistory';
import MenuHome from '../../icons/MenuHome';
import MenuProfile from '../../icons/MenuProfile';
import MenuShop from '../../icons/MenuShop';
import { getUserData } from '../../../utils/storage';
import styles from './styles.scoped.css';

export default function Toolbar(props) {
  const { onClickLogin } = props;
  const location = useLocation();
  const { pathname } = location;
  const [active, setActive] = useState(0);
  const user = getUserData();
  const firstLayers = ['/', '/history/bill', '/shop', '/help', '/profile'];
  const hidden = firstLayers.includes(pathname) ? undefined : { display: 'none' };

  useEffect(() => {
    (p => {
      if (p === firstLayers[1]) {
        setActive(1);
      } else if (p === firstLayers[2]) {
        setActive(2);
      } else if (p === firstLayers[3]) {
        setActive(3);
      } else {
        setActive(0);
      }
    })(pathname);
  }, [pathname]);

  const menus = [
    { icon: MenuHome, text: 'Home', to: firstLayers[0] },
    { icon: MenuHistory, text: 'History', to: firstLayers[1] },
    { icon: MenuShop, text: 'Shop', to: firstLayers[2] },
    { icon: MenuHelp, text: 'Bantuan', to: firstLayers[3] },
  ];

  menus.push(user
    ? { icon: MenuProfile, text: 'Profile', to: firstLayers[4] }
    : { icon: MenuProfile, text: 'Masuk/Daftar', to: location }
  );

  return (
    <nav className={styles.root} style={hidden}>
      {menus.map((i, idx) => (
        <Item active={active} idx={idx} item={i} key={idx}
          onClickLogin={onClickLogin} user={user} />
      ))}
    </nav>
  );
}

Toolbar.defaultProps = {
  onClickLogin: () => { },
};

Toolbar.propTypes = {
  onClickLogin: PropTypes.func,
};

export function Item(props) {
  const { active, idx, item, onClickLogin, user } = props;

  if (idx === 1 && !user) {
    return null;
  }

  const className = idx === active ? styles.active : '';
  const onClick = (idx === 4 && !user) ? onClickLogin : () => {};

  return (
    <Link className={className} onClick={onClick} to={item.to}>
      {item.icon({ fill: idx === active ? '#ee3124' : '#b2b4b5' })}
      {item.text}
    </Link>
  );
}

Item.defaultProps = {
  active: 0,
  idx: 0,
  item: {},
  onClickLogin: () => {},
  user: '',
};

Item.propTypes = {
  active: PropTypes.number,
  idx: PropTypes.number,
  item: PropTypes.object,
  onClickLogin: PropTypes.func,
  user: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
};
