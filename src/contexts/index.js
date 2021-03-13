import React from 'react';
import PropTypes from 'prop-types';
import AppContextProvider, { AppContext } from './app';
import NpsContextProvider, { NpsCodes, NpsContext } from './nps';

export { AppContext, NpsCodes, NpsContext };
export default function ContextProvider({ children }) {
  return (
    <AppContextProvider>
      <NpsContextProvider>
        {children}
      </NpsContextProvider>
    </AppContextProvider>
  );
}

ContextProvider.defaultProps = {
  children: null,
};

ContextProvider.propTypes = {
  children: PropTypes.node,
};
