import Arrow from '../Arrow';
import Call from '../Call';
import MenuHelp from '../MenuHelp';
import MenuHistory from '../MenuHistory';
import MenuHome from '../MenuHome';
import MenuProfile from '../MenuProfile';
import MenuShop from '../MenuShop';
import Rate from '../Rate';

describe('src/components/icons', () => {
  test('render', () => {
    const expects = icons => {
      icons.forEach(I => expect(I(I.defaultProps).type).toBe('svg'));
    };

    expects([
      Arrow,
      Call,
      MenuHelp,
      MenuHistory,
      MenuHome,
      MenuProfile,
      MenuShop,
      Rate,
    ]);
  });
});
