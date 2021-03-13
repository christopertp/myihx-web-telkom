import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ShallowRenderer from 'react-test-renderer/shallow';
import Spinner from '../../../elements/Spinner';
import PersonalDataReview from '../PersonalDataReview';


useParams.mockImplementation(() => ({ page: 'e-ktp' }));

useSelector.mockImplementation(fn => {
  fn({});
  return { form: '' };
});

describe('src/components/forms/PersonalDataReview', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PersonalDataReview />);
    expect(tree).toMatchSnapshot();
    PersonalDataReview.defaultProps.handleSubmit();
    PersonalDataReview.defaultProps.initialize();
    PersonalDataReview.defaultProps.onRetake();
  });

  test('loading & error state', () => {
    const initialize = jest.fn();
    const props = { ...PersonalDataReview.defaultProps, initialize };
    useParams.mockImplementation(() => ({ page: 'e-ktp', subpage: 'edit' }));
    useSelector.mockImplementationOnce(() => ({ form: '', isLoading: true, message: 'error' }));

    const result = PersonalDataReview(props);
    expect(result.props.children[4].props.children).toBe('error');
    expect(result.props.children[5].props.children[1].props.children.type).toBe(Spinner);
    expect(initialize).toHaveBeenCalled();
  });

  test('validate', () => {
    const initialize = jest.fn();
    const props = { ...PersonalDataReview.defaultProps, initialize };

    useParams.mockImplementation(() => ({ page: 'ktp', subpage: 'edit' }));

    const result = PersonalDataReview(props);

    const v1 = result.props.children[3].props.validate('tes');
    expect(v1).toBe('');

    const v2 = result.props.children[3].props.validate('');
    expect(v2).toBe('Harus diisi');
  });
});
