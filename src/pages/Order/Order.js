import React from 'react';
import { useParams } from 'react-router-dom';
import OrderPackage from '../../components/fragments/OrderPackage';
import OrderWifiExtender from '../../components/fragments/OrderWifiExtender';

export default function Order() {
  const { page } = useParams();

  return (
    <>
      {(p => {
        switch (p) {
          case 'package': return <OrderPackage />;
          case 'wifi-extender': return <OrderWifiExtender />;
          default: return null;
        }
      })(page)}
    </>
  );
}
