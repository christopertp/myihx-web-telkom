import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { Field } from 'redux-form';
import Button from '../../elements/Button';
import Spinner from '../../elements/Spinner';
import Autocomplete from '../../fields/Autocomplete';
import TextField from '../../fields/Text';
import styles from './styles.scoped.css';

export default function CheckCoverageAddress(props) {
  const { address, change, handleSubmit, invalid } = props;
  const dispatch = useDispatch();
  const data = useSelector(s => s.checkCoverage);
  const formData = useSelector(s => s.form.checkCoverageAddress.values);
  const { cities, districts, fetchAddress, isLoading, message, provinces, streets } = data;
  const { cityCode, districtCode, provinceCode } = formData;

  const [mapCities, resetCities] = useMappedAddress(cities);
  const [mapDistricts, resetDistricts] = useMappedAddress(districts);
  const [mapProvinces] = useMappedAddress(provinces);
  const [mapStreets, resetStreets] = useMappedAddress(streets);

  useEffect(() => {
    dispatch(fetchAddress('provinces'));
    change('addressDescription', address);
  }, []);

  const onSearch = (name, value) => {
    const fn = {
      provinces: () => fetchAddress('provinces', value),
      cities: () => fetchAddress('cities', provinceCode, value),
      districts: () => fetchAddress('districts', cityCode, value),
      streets: () => fetchAddress('streets', cityCode, districtCode, value),
    };
    dispatch(fn[name]());
  };

  useEffect(() => {
    provinceCode && dispatch(fetchAddress('cities', provinceCode));
    resetCities();
    resetDistricts();
    resetStreets();
    change('cityCode', '');
    change('districtCode', '');
    change('streetCode', '');
  }, [provinceCode]);

  useEffect(() => {
    cityCode && dispatch(fetchAddress('districts', cityCode));
    resetDistricts();
    resetStreets();
    change('districtCode', '');
    change('streetCode', '');
  }, [cityCode]);

  useEffect(() => {
    if (districtCode) {
      dispatch(fetchAddress('streets', cityCode, districtCode));
      change('postalCode', districts.find(i => i.id === districtCode).postalCode);
    }
    resetStreets();
    change('streetCode', '');
  }, [districtCode]);

  const loadingPlaceholder = (key, placeholder) => isLoading[key] ? 'Loading...' : placeholder;
  const selectDisabled = prevCode => !prevCode;

  const inputProps = [
    {
      label: 'PROVINCE',
      placeholder: loadingPlaceholder('p', 'Choose your province'),
    },
    {
      disabled: selectDisabled(provinceCode),
      label: 'CITY',
      placeholder: loadingPlaceholder('c', 'Choose'),
    },
    {
      disabled: selectDisabled(cityCode),
      label: 'DISTRICT',
      placeholder: loadingPlaceholder('d', 'Choose'),
    },
    {
      disabled: selectDisabled(districtCode),
      label: 'NEAREST ADDRESS',
      placeholder: loadingPlaceholder('s', 'Choose nearest address'),
    },
    {
      label: 'DETAILED ADDRESS',
      placeholder: 'Enter your address',
    },
    {
      label: 'RT/RW (OPTIONAL)',
      placeholder: 'Enter number',
    },
    {
      disabled: true,
      label: 'ZIP CODE',
      placeholder: 'Enter number',
    },
  ];

  return (
    <form className={styles.root} onSubmit={handleSubmit}>
      <Field component={Autocomplete} inputProps={inputProps[0]} name="provinceCode" onSearch={v => onSearch('provinces', v)} options={mapProvinces} />
      <section className={styles.half}>
        <div><Field component={Autocomplete} inputProps={inputProps[1]} name="cityCode" onSearch={v => onSearch('cities', v)} options={mapCities} /></div>
        <div><Field component={Autocomplete} inputProps={inputProps[2]} name="districtCode" onSearch={v => onSearch('districts', v)} options={mapDistricts} /></div>
      </section>
      <Field component={Autocomplete} inputProps={inputProps[3]} name="streetCode" onSearch={v => onSearch('streets', v)} options={mapStreets} />
      <Field component={TextField} inputProps={inputProps[4]} name="addressDescription" />
      <section className={styles.half}>
        <div><Field component={TextField} inputProps={inputProps[5]} name="rtRw" normalize={normalizeRtRw} /></div>
        <div><Field component={TextField} inputProps={inputProps[6]} name="postalCode" /></div>
      </section>
      {(message && message !== 'PT2') && <small className={styles.error}>{message}</small>}
      <Button disabled={invalid || isLoading.submit} type="submit">
        {isLoading.submit ? <Spinner /> : 'Next'}
      </Button>
    </form>
  );
}

CheckCoverageAddress.defaultProps = {
  address: '',
  change: () => { },
  handleSubmit: () => { },
  invalid: false,
};

CheckCoverageAddress.propTypes = {
  address: PropTypes.string,
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  invalid: PropTypes.bool,
};

export function normalizeRtRw(v, pv) {
  const [rt, rw] = v.split('/');
  if (v.match(/^\d\d\d\d$/)) {
    return `${v.slice(0, 3)}/${v.slice(-1)}`;
  } else if (rt && rt.length > 3) {
    return pv;
  } else if (rw && rw.length > 3) {
    return pv;
  } else if (v.match(/[^0-9/]/)) {
    return pv;
  } else {
    return v;
  }
}

export function useMappedAddress(data) {
  const [mapData, setMapData] = useState([]);
  useEffect(() => {
    setMapData(data.map(i => ({ text: i.name, value: `${i.id}` })));
  }, [data]);
  return [mapData, () => setMapData([])];
}
