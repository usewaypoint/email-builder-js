import { TEditorConfiguration } from '../../documents/editor/core';

const EMPTY_EMAIL_MESSAGE: TEditorConfiguration = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F8F8F8',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: [],
    },
  },
};

export default EMPTY_EMAIL_MESSAGE;
