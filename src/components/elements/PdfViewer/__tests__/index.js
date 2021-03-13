import React, { useRef } from 'react';
import ShallowRenderer from 'react-test-renderer/shallow';
import PdfViewer from '../PdfViewer';

document.createElement = () => ({
  getContext: jest.fn(),
});

describe('src/components/elements/PdfViewer', () => {
  test('render', () => {
    const shallow = new ShallowRenderer();
    const tree = shallow.render(<PdfViewer />);
    expect(tree).toMatchSnapshot();
  });

  test('render with url', async () => {
    const current = {
      appendChild: jest.fn(),
      classList: {
        remove: jest.fn(),
      },
    };
    useRef.mockImplementationOnce(() => ({ current }));

    await PdfViewer({ url: 'tes' });

    useRef.mockImplementationOnce(() => ({ current }));

    delete global.devicePixelRatio;
    global.devicePixelRatio = 0;

    await PdfViewer({ url: 'tes' });

    expect(current.classList.remove).toHaveBeenCalledWith('loading');
  });
});
