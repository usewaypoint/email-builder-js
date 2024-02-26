import { HeadingPropsSchema } from '../src';

describe('HeadingPropsSchema', () => {
  describe('style', () => {
    it('allows empty objects', () => {
      const p = HeadingPropsSchema.shape.style;
      expect(p.parse({})).toEqual({
        backgroundColor: null,
        color: null,
        fontFamily: null,
        fontWeight: 'bold',
        padding: null,
        textAlign: null,
      });
    });

    describe('.color', () => {
      const p = HeadingPropsSchema.shape.style.shape.color;
      it('allows hex strings', () => {
        expect(p.parse('#000111')).toEqual('#000111');
        expect(p.parse('#fff111')).toEqual('#fff111');
        expect(p.parse('#FAFAFA')).toEqual('#FAFAFA');
      });

      it('is optional', () => {
        expect(p.safeParse(null)).toEqual({ success: true, data: null });
        expect(p.safeParse(undefined)).toEqual({ success: true, data: null });
      });

      it('rejects non-hex values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);

        expect(p.safeParse('#000e111').success).toEqual(false);
        expect(p.safeParse('#ffef111').success).toEqual(false);
        expect(p.safeParse('#LLL111').success).toEqual(false);
        expect(p.safeParse('#FFF').success).toEqual(false);
        expect(p.safeParse('red').success).toEqual(false);
        expect(p.safeParse('').success).toEqual(false);
      });
    });

    describe('.backgroundColor', () => {
      const p = HeadingPropsSchema.shape.style.shape.backgroundColor;
      it('allows hex strings', () => {
        expect(p.parse('#000111')).toEqual('#000111');
        expect(p.parse('#fff111')).toEqual('#fff111');
        expect(p.parse('#FAFAFA')).toEqual('#FAFAFA');
      });

      it('is optional', () => {
        expect(p.safeParse(null)).toEqual({ success: true, data: null });
        expect(p.safeParse(undefined)).toEqual({ success: true, data: null });
      });

      it('rejects non-hex values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);

        expect(p.safeParse('#000e111').success).toEqual(false);
        expect(p.safeParse('#ffef111').success).toEqual(false);
        expect(p.safeParse('#LLL111').success).toEqual(false);
        expect(p.safeParse('#FFF').success).toEqual(false);
        expect(p.safeParse('red').success).toEqual(false);
        expect(p.safeParse('').success).toEqual(false);
      });
    });

    describe('.fontFamily', () => {
      const p = HeadingPropsSchema.shape.style.shape.fontFamily;
      it('is optional', () => {
        expect(p.safeParse(null)).toEqual({ success: true, data: null });
        expect(p.safeParse(undefined)).toEqual({ success: true, data: null });
      });

      it('rejects non-string values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);
      });

      it('rejects non-string values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);
      });
    });

    describe('.fontWeight', () => {
      const p = HeadingPropsSchema.shape.style.shape.fontWeight;
      it('defaults to bold', () => {
        expect(p.parse(null)).toEqual(null);
        expect(p.parse(undefined)).toEqual('bold');
      });

      it('rejects invalid values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse('pretty big').success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);
      });

      it('allows enum values', () => {
        expect(p.parse('bold')).toEqual('bold');
        expect(p.parse('normal')).toEqual('normal');
      });
    });

    describe('.textAlign', () => {
      const p = HeadingPropsSchema.shape.style.shape.textAlign;
      it('is optional', () => {
        expect(p.safeParse(null)).toEqual({ success: true, data: null });
        expect(p.safeParse(undefined)).toEqual({ success: true, data: null });
      });

      it('rejects invalid values', () => {
        expect(p.safeParse(100).success).toEqual(false);
        expect(p.safeParse('alignment').success).toEqual(false);
        expect(p.safeParse({ name: 'ok' }).success).toEqual(false);
      });

      it('allows enum values', () => {
        expect(p.parse('left')).toEqual('left');
        expect(p.parse('center')).toEqual('center');
        expect(p.parse('right')).toEqual('right');
      });
    });

    describe('.padding', () => {
      const fontFamily = HeadingPropsSchema.shape.style.shape.padding;
      it('is optional', () => {
        expect(fontFamily.safeParse(null)).toEqual({ success: true, data: null });
        expect(fontFamily.safeParse(undefined)).toEqual({ success: true, data: null });
      });

      it('rejects non-string values', () => {
        expect(fontFamily.safeParse(100).success).toEqual(false);
        expect(fontFamily.safeParse({ name: 'ok' }).success).toEqual(false);
      });

      it('receives an object', () => {
        const VALUE = { top: 10, bottom: 10, right: 10, left: 10 };
        expect(fontFamily.parse(VALUE)).toEqual(VALUE);
      });
    });
  });

  describe('props', () => {
    const p = HeadingPropsSchema.shape.props;
    it('defaults to level h2', () => {
      expect(p.parse({ text: 'hello' })).toEqual({ text: 'hello', level: 'h2' });
    });

    it('allows level enums', () => {
      expect(p.parse({ text: 'hello', level: 'h1' })).toEqual({ text: 'hello', level: 'h1' });
    });
  });
});
