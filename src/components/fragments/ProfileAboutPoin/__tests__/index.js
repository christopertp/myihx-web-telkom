import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import ProfileAboutPoin from '../ProfileAboutPoin';

useSelector.mockImplementation(fn => {
  fn({});
  return {
    fetchAboutPoint: jest.fn(),
    aboutPoint: {
      content: [{
        body: [{
          descriptions: [{
            detail: 'Bill payment amount for Dual Play customers',
            header: '10 poin / Rp 10.000',
          }],
          text: 'Poin myIndiHome is a loyalty program aimed for IndiHome Triple Play and Dual Play Package customers.'
        }],
        header: 'What is Poin myIndiHome?',
      }],
      pageDesc: 'Learn more about points and rewards from myIndiHome!',
      pageTitle: 'What is Poin myIndiHome?',
    }
  };
});

describe('src/components/fragments/ProfileAboutPoin', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<ProfileAboutPoin />);
    expect(tree).toMatchSnapshot();
  });

  test('call get about poin', () => {
    const dispatch = jest.fn();
    useDispatch.mockImplementationOnce(() => dispatch);

    ProfileAboutPoin();
    expect(dispatch).toHaveBeenCalled();
  });
});
