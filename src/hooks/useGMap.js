import { useEffect, useRef, useState } from 'react';
import { initScript } from '../utils/third-parties';

const API_KEY = 'AIzaSyAQXWK6EcpG-mlyrJNhk37z58UVZRyOX2I';

export default props => {
  const { coord, setCoord, setAddress } = props;
  const src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;
  const refInput = useRef(null);
  const refMap = useRef(null);
  const [geocoder, setGeocoder] = useState();

  const cbGeocode = res => {
    if (!res.length) {
      return;
    }
    const { formatted_address } = res[0];
    setAddress(formatted_address);
  };

  useEffect(() => {
    const onLoad = () => {
      const { geolocation } = window.navigator;
      const { Geocoder, Map: GMap, Marker, places: { Autocomplete } } = window.google.maps;

      const a = new Autocomplete(refInput.current);
      const g = new Geocoder;
      const m = new GMap(refMap.current, { center: coord, zoom: 15 });
      const mk = new Marker({ draggable: true, map: m });

      const setDefault = () => {
        mk.setPosition(coord);
        g.geocode({ location: coord, region: 'ID' }, cbGeocode);
      };

      const setPosition = position => {
        const { latitude, longitude } = position.coords;
        const pos = { lat: latitude, lng: longitude };
        m.setCenter(pos);
        mk.setPosition(pos);
        g.geocode({ location: pos, region: 'ID' }, cbGeocode);
      };

      a.bindTo('bounds', m);
      a.addListener('place_changed', () => {
        const { geometry } = a.getPlace();
        if (!geometry) {
          return;
        }
        const { lat, lng } = geometry.location;
        const pos = { lat: lat(), lng: lng() };
        setCoord(pos);
        m.setCenter(pos);
        mk.setPosition(pos);
      });

      m.addListener('click', e => {
        const { lat, lng } = e.latLng;
        const pos = { lat: lat(), lng: lng() };
        setCoord(pos);
        mk.setPosition(pos);
      });

      mk.addListener('dragend', e => {
        const { lat, lng } = e.latLng;
        setCoord({ lat: lat(), lng: lng() });
      });

      if (geolocation) {
        geolocation.getCurrentPosition(setPosition, setDefault);
      } else {
        setDefault();
      }

      setGeocoder(g);
    };
    initScript('gmaps-init', src, onLoad);
  }, []);

  useEffect(() => {
    const param = { location: coord, region: 'ID' };
    geocoder && geocoder.geocode(param, cbGeocode);
  }, [coord]);

  return { refInput, refMap };
};
