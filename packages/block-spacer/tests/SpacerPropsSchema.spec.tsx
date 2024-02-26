import { SpacerPropsSchema } from '../src';

describe('SpacerPropsSchema', () => {
  describe('props', () => {
    const p = SpacerPropsSchema.shape.props;
    it('can be empty', () => {
      expect(p.parse({})).toEqual({});
    });

    it('has height', () => {
      expect(p.parse({ height: 10 })).toEqual({ height: 10 });
    });
  });
});
