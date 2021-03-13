import { useState } from 'react';
import { initScript } from '../../utils/third-parties';
import useGMap from '../useGMap';

jest.mock('../../utils/third-parties', () => ({
  initScript: jest.fn(),
}));

const Geocoder = jest.fn();
const GMap = jest.fn(() => ({ addListener: jest.fn() }));
const Marker = jest.fn(() => ({ addListener: jest.fn() }));
const Autocomplete = jest.fn(() => ({
  addListener: jest.fn(),
  bindTo: jest.fn(),
}));
const getCurrentPosition = jest.fn();

window.google = {
  maps: {
    Geocoder,
    Map: GMap,
    Marker,
    places: { Autocomplete },
  }
};
delete window.navigator;
window.navigator = {
  geolocation: { getCurrentPosition },
};

describe('src/hooks/useGMap', () => {
  test('useGMap', () => {
    const result = useGMap({});
    expect(result).toHaveProperty('refInput');
    expect(result).toHaveProperty('refMap');
  });

  test('coord updated with result', () => {
    const setAddress = jest.fn();
    const geocoder = {
      geocode: (_, fn) => { fn([{ formatted_address: 'address' }]); }
    };
    const props = { setAddress };
    useState.mockImplementationOnce(() => [geocoder, jest.fn()]);

    useGMap(props);
    expect(setAddress).toHaveBeenCalledWith('address');
  });

  test('coord updated with no result', () => {
    const setAddress = jest.fn();
    const geocoder = {
      geocode: (_, fn) => { fn([]); }
    };
    const props = { setAddress };
    useState.mockImplementationOnce(() => [geocoder, jest.fn()]);

    useGMap(props);
    expect(setAddress).toHaveBeenCalledTimes(0);
  });

  test('addListeners Marker on load', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const addListener = (_, fn) => {
      fn({
        latLng: {
          lat: () => 10,
          lng: () => 25,
        }
      });
    };
    const setCoord = jest.fn();
    Marker.mockImplementationOnce(() => ({ addListener }));
    useGMap({ setCoord });
    expect(setCoord).toHaveBeenCalledWith({ lat: 10, lng: 25 });
  });

  test('addListeners Map on load', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const addListener = (_, fn) => {
      fn({
        latLng: {
          lat: () => 10,
          lng: () => 25,
        }
      });
    };
    const setCoord = jest.fn();
    const setPosition = jest.fn();
    GMap.mockImplementationOnce(() => ({ addListener }));
    Marker.mockImplementationOnce(() => ({ addListener: jest.fn(), setPosition }));
    useGMap({ setCoord });
    expect(setCoord).toHaveBeenCalledWith({ lat: 10, lng: 25 });
    expect(setPosition).toHaveBeenCalledWith({ lat: 10, lng: 25 });
  });

  test('addListeners Autocomplete on load', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const addListener = (_, fn) => {
      fn();
    };
    const setCoord = jest.fn();
    const setCenter = jest.fn();
    const setPosition = jest.fn();
    const getPlace = () => ({
      geometry: {
        location: {
          lat: () => 10,
          lng: () => 25,
        },
      },
    });
    Autocomplete.mockImplementationOnce(() => ({ addListener, getPlace, bindTo: jest.fn() }));
    GMap.mockImplementationOnce(() => ({ addListener: jest.fn(), setCenter }));
    Marker.mockImplementationOnce(() => ({ addListener: jest.fn(), setPosition }));
    useGMap({ setCoord });
    expect(setCoord).toHaveBeenCalledWith({ lat: 10, lng: 25 });
    expect(setCenter).toHaveBeenCalledWith({ lat: 10, lng: 25 });
    expect(setPosition).toHaveBeenCalledWith({ lat: 10, lng: 25 });
  });

  test('addListeners Autocomplete on load with no geometry', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const addListener = (_, fn) => {
      fn();
    };
    const setCoord = jest.fn();
    const getPlace = () => ({});
    Autocomplete.mockImplementationOnce(() => ({ addListener, getPlace, bindTo: jest.fn() }));
    useGMap({ setCoord });
    expect(setCoord).toHaveBeenCalledTimes(0);
  });

  test('google.maps onload with geolocation to setPosition', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const pos = {
      coords: { latitude: 10, longitude: 25 },
    };
    const geocode = jest.fn();
    const setCenter = jest.fn();
    const setPosition = jest.fn();
    window.navigator.geolocation.getCurrentPosition.mockImplementationOnce(fn => fn(pos));
    GMap.mockImplementationOnce(() => ({
      addListener: jest.fn(),
      setCenter,
    }));
    Marker.mockImplementationOnce(() => ({
      addListener: jest.fn(),
      setPosition,
    }));
    Geocoder.mockImplementationOnce(() => ({ geocode }));
    useGMap({});
    expect(geocode).toHaveBeenCalled();
    expect(setCenter).toHaveBeenCalledWith({ lat: 10, lng: 25 });
    expect(setPosition).toHaveBeenCalledWith({ lat: 10, lng: 25 });
  });

  test('google.maps onload with no geolocation to setDefault', () => {
    initScript.mockImplementationOnce((_, __, fn) => {
      fn();
    });
    const geocode = jest.fn();
    const setPosition = jest.fn();
    window.navigator = {};
    Marker.mockImplementationOnce(() => ({
      addListener: jest.fn(),
      setPosition,
    }));
    Geocoder.mockImplementationOnce(() => ({ geocode }));
    useGMap({ coord: 'coord' });
    expect(geocode).toHaveBeenCalled();
    expect(setPosition).toHaveBeenCalledWith('coord');
  });
});
