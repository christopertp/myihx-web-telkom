import WhiteCard from '../../../layouts/WhiteCard';
import ErrorBoundary from '../ErrorBoundary';

const reload = jest.fn();
delete global.location;
global.location = { reload };

describe('src/components/elements/ErrorBoundary', () => {
  test('render', () => {
    const result = new ErrorBoundary();
    result.props = {};
    result.state.error = true;

    const render = result.render();
    expect(render.type).toBe(WhiteCard);
    render.props.children.props.onClick();
    expect(reload).toHaveBeenCalled();

    result.setState = jest.fn();
    result.componentDidCatch('error');
    expect(result.setState).toHaveBeenCalledWith({ error: 'error' });
  });

  test('render with no catch', () => {
    const result = new ErrorBoundary();
    result.props = {
      children: 'tes',
    };
    expect(result.render()).toBe('tes');
  });
});
