import { TEditorConfiguration } from '../../documents/editor/core';

const ORDER_ECOMMERCE: TEditorConfiguration = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#FFFFFF',
      canvasColor: '#FFFFFF',
      textColor: '#333333',
      fontFamily: 'MODERN_SANS',
      childrenIds: [
        'block_Ei34o65X5XnD5dexNQgXh8',
        'block_SLut2hpFsy7U6SmhtLtWNU',
        'block_RrwLc5YMpHJGE5Xe9fAZVW',
        'block_FHCeHrN3XNaH7bu6HhjVNT',
        'block_3vynUg15EevMA6DiLsWJk2',
        'block_5eQPGdKJ6JQYXCD1MEaHbv',
        'block_WK3b19BzGE8VNKDwiSZ8s8',
        'block_Pe2Dm5Cbqq5CcjL5wEdMg4',
        'block_SizNWJDCcqw9tGH2ComdDX',
        'block_4Qxv32WQo8pDzPu1d3vixz',
        'block_LKiZYDTPeJGkRWHForFSDQ',
        'block_P6XtJj721vPfrhXKzS8uR5',
        'block_AKTwpjBmtevcfj82z52i8p',
      ],
    },
  },
  block_PHe2XSbV4RvD76p21F3VdN: {
    type: 'Heading',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        level: 'h2',
        text: '{{store.name}}',
      },
    },
  },
  block_DeTzPQDerYjBEMkt6TuD41: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_PHe2XSbV4RvD76p21F3VdN'],
      },
    },
  },
  block_TPxZn2Fjxc7MwgXAEybxkV: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '#{{order.id}}',
      },
    },
  },
  block_5fuNN9F4uZRTGa4Hy5F4Nd: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_TPxZn2Fjxc7MwgXAEybxkV'],
      },
    },
  },
  block_RaSBTPwdN9QB7g2WRDUfDn: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_Ei34o65X5XnD5dexNQgXh8: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 24,
          left: 24,
          right: 24,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_DeTzPQDerYjBEMkt6TuD41'],
          },
          {
            childrenIds: ['block_5fuNN9F4uZRTGa4Hy5F4Nd'],
          },
          {
            childrenIds: ['block_RaSBTPwdN9QB7g2WRDUfDn'],
          },
        ],
      },
    },
  },
  block_SLut2hpFsy7U6SmhtLtWNU: {
    type: 'Heading',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 16,
          bottom: 0,
          left: 24,
          right: 24,
        },
      },
      props: {
        level: 'h3',
        text: 'Thank you for your purchase!',
      },
    },
  },
  block_RrwLc5YMpHJGE5Xe9fAZVW: {
    type: 'Text',
    data: {
      style: {
        color: '#404040',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 16,
          bottom: 16,
          left: 24,
          right: 24,
        },
      },
      props: {
        text: 'Hi {{order.customer.displayName}},\n\nWe are preparing your package. Your tracking number will be generated once the package is ready to ship.',
      },
    },
  },
  block_FHCeHrN3XNaH7bu6HhjVNT: {
    type: 'Button',
    data: {
      style: {
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 16,
          bottom: 40,
          left: 24,
          right: 24,
        },
      },
      props: {
        buttonBackgroundColor: '#5696E5',
        buttonStyle: 'rounded',
        buttonTextColor: '#FFFFFF',
        fullWidth: false,
        size: 'large',
        text: 'View your order',
        url: 'https://www.example.com/orders/{{order.id}}',
      },
    },
  },
  block_3vynUg15EevMA6DiLsWJk2: {
    type: 'Heading',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 16,
          bottom: 0,
          left: 24,
          right: 24,
        },
      },
      props: {
        level: 'h3',
        text: 'Order summary',
      },
    },
  },
  block_Dvs2GYcF6SzfCYYNwfv1oM: {
    type: 'Image',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        textAlign: 'left',
      },
      props: {
        height: null,
        width: null,
        url: 'https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_FBfTeYhbdXtqYpCA/kiran-ck-6rXpQzfCYlw-unsplash.jpg',
        alt: '',
        linkHref: null,
        contentAlignment: 'middle',
      },
    },
  },
  block_KnMb2mQSf7nz8HXx6jyDUV: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_Dvs2GYcF6SzfCYYNwfv1oM'],
      },
    },
  },
  block_4sAeV4cLVKV8y4QFGV3Gf7: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 4,
          bottom: 4,
          left: 4,
          right: 4,
        },
      },
      props: {
        childrenIds: ['block_KnMb2mQSf7nz8HXx6jyDUV'],
      },
    },
  },
  block_TBZZDHvoKHcW3j2nwQgmhC: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 4,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{lineItem.productName}} x {{lineItem.qty}}',
      },
    },
  },
  block_KqpmZUcZajsnFMbTMhizZs: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 8,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{lineItem.variant}}',
      },
    },
  },
  block_JbZJ8FqT6GxQ4i6wEiWztp: {
    type: 'Image',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
        textAlign: 'left',
      },
      props: {
        height: null,
        width: null,
        url: 'https://d1iiu589g39o6c.cloudfront.net/live/platforms/platform_A9wwKSL6EV6orh6f/images/wptemplateimage_vjmjV2NrQ52h1iLj/coupon.png',
        alt: '',
        linkHref: null,
        contentAlignment: 'middle',
      },
    },
  },
  block_92JgagxxVxzyfnbvj5iUUJ: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_JbZJ8FqT6GxQ4i6wEiWztp'],
      },
    },
  },
  block_9bNBgfiJJyh65pfsy1fu7e: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 12,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '({{lineItem.discount}})',
      },
    },
  },
  block_TdFvCzpv5j9SZgktRbSTwu: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_9bNBgfiJJyh65pfsy1fu7e'],
      },
    },
  },
  block_7JwR5SHM2Bfjihamh45tRL: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_S8F4TkiuTVLF2GTQn67eGY: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_92JgagxxVxzyfnbvj5iUUJ'],
          },
          {
            childrenIds: ['block_TdFvCzpv5j9SZgktRbSTwu'],
          },
          {
            childrenIds: ['block_7JwR5SHM2Bfjihamh45tRL'],
          },
        ],
      },
    },
  },
  block_GQ77o7MDMwj48B5nocEJNq: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_TBZZDHvoKHcW3j2nwQgmhC', 'block_KqpmZUcZajsnFMbTMhizZs', 'block_S8F4TkiuTVLF2GTQn67eGY'],
      },
    },
  },
  block_RJU6wqWp4io29SK1kEESC7: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '<s>{{lineItem.originalPrice}}</s>',
      },
    },
  },
  block_6VvTYskm3BULZZEfYCkjwN: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{lineItem.price}}',
      },
    },
  },
  block_V34TMZ9yg6t4xKMYfyD2Rk: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_RJU6wqWp4io29SK1kEESC7', 'block_6VvTYskm3BULZZEfYCkjwN'],
      },
    },
  },
  block_YBtUndjQaRuLFpEkgvjagk: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 3,
        columns: [
          {
            childrenIds: ['block_4sAeV4cLVKV8y4QFGV3Gf7'],
          },
          {
            childrenIds: ['block_GQ77o7MDMwj48B5nocEJNq'],
          },
          {
            childrenIds: ['block_V34TMZ9yg6t4xKMYfyD2Rk'],
          },
        ],
      },
    },
  },
  block_XykBAUxf8awiR2CxBfNLZN: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_YBtUndjQaRuLFpEkgvjagk'],
      },
    },
  },
  block_9AvGGkcg4Rq93DmxXjXwEP: {
    type: 'Divider',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 8,
          bottom: 8,
          left: 0,
          right: 0,
        },
      },
      props: {
        lineHeight: 1,
        lineColor: '#5696e5',
      },
    },
  },
  block_5eQPGdKJ6JQYXCD1MEaHbv: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 24,
          right: 24,
        },
      },
      props: {
        childrenIds: ['block_XykBAUxf8awiR2CxBfNLZN', 'block_9AvGGkcg4Rq93DmxXjXwEP'],
      },
    },
  },
  block_Wnt477QxYNynetWGwkLg89: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_FnzMxssTraByh9FbbnJvRw: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Discount {% if order.discountCode %} ({{order.discountCode}}){% endif %}',
      },
    },
  },
  block_NyMsczQB7L3BKUa1RpUauu: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_FnzMxssTraByh9FbbnJvRw'],
      },
    },
  },
  block_AcbYK2jnr4sqG1GAbUHqNL: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.discount}}',
      },
    },
  },
  block_BgHgpkAxq2qJUttN8pimnE: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_AcbYK2jnr4sqG1GAbUHqNL'],
      },
    },
  },
  block_XDBPpdogWWkKUea5aEVxBW: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_2QEX1chf5uWU5ZZebf4gmu: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 8,
          bottom: 8,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_NyMsczQB7L3BKUa1RpUauu'],
          },
          {
            childrenIds: ['block_BgHgpkAxq2qJUttN8pimnE'],
          },
          {
            childrenIds: ['block_XDBPpdogWWkKUea5aEVxBW'],
          },
        ],
      },
    },
  },
  block_Q87SYRrWCwfRa56q3qLBDG: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Subtotal',
      },
    },
  },
  block_QUNbV1p7f9qaSEvyLmnxmD: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_Q87SYRrWCwfRa56q3qLBDG'],
      },
    },
  },
  block_cF6MdfmbKisXytmfPU4QY: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.subtotal}}',
      },
    },
  },
  block_4WkcuRqzqvTFvHGSBLGAAG: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_cF6MdfmbKisXytmfPU4QY'],
      },
    },
  },
  block_4g5P818eH6oLmfUcE9BaJT: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_Lu666sTP6hqLkHiBThmm4G: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_QUNbV1p7f9qaSEvyLmnxmD'],
          },
          {
            childrenIds: ['block_4WkcuRqzqvTFvHGSBLGAAG'],
          },
          {
            childrenIds: ['block_4g5P818eH6oLmfUcE9BaJT'],
          },
        ],
      },
    },
  },
  block_GgUZQtnTQbiBFhMdJE5YYB: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Shipping',
      },
    },
  },
  block_XzjZ3cnqJrKrwubFwD4VSr: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_GgUZQtnTQbiBFhMdJE5YYB'],
      },
    },
  },
  block_ViKMzYtjFGRksFuzRn5rny: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.shipping}}',
      },
    },
  },
  block_AcDrP2ZMVByFU269wvMgtw: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_ViKMzYtjFGRksFuzRn5rny'],
      },
    },
  },
  block_WN1hfLUiC4HwsGD3bFhF4a: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_Gn2h8bajFuW8zDBsiVVitV: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_XzjZ3cnqJrKrwubFwD4VSr'],
          },
          {
            childrenIds: ['block_AcDrP2ZMVByFU269wvMgtw'],
          },
          {
            childrenIds: ['block_WN1hfLUiC4HwsGD3bFhF4a'],
          },
        ],
      },
    },
  },
  block_64aQbVaGVuFmvjPfr9hend: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Taxes',
      },
    },
  },
  block_QTKa4AdGxtSbJmRY7ytjD8: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_64aQbVaGVuFmvjPfr9hend'],
      },
    },
  },
  block_H1MgkbcNH4sz8pMC2h4dVh: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.taxes}}',
      },
    },
  },
  block_Mi7A4sXfSXaEcjFV17WgSg: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_H1MgkbcNH4sz8pMC2h4dVh'],
      },
    },
  },
  block_LhgMdiSRYUsSBtJTggegRe: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_2xkeWLDtTXj5jFg57KhfYR: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_QTKa4AdGxtSbJmRY7ytjD8'],
          },
          {
            childrenIds: ['block_Mi7A4sXfSXaEcjFV17WgSg'],
          },
          {
            childrenIds: ['block_LhgMdiSRYUsSBtJTggegRe'],
          },
        ],
      },
    },
  },
  block_QgSNshqbsUkk4FrRywjoRd: {
    type: 'Divider',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 0,
          right: 0,
        },
      },
      props: {
        lineHeight: 1,
        lineColor: '#5696e5',
      },
    },
  },
  block_B5teSFiXFfpLmiB29c1WYF: {
    type: 'Text',
    data: {
      style: {
        color: '#808080',
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Total',
      },
    },
  },
  block_DPodDUHaaLcYuAG3CQi1F7: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_B5teSFiXFfpLmiB29c1WYF'],
      },
    },
  },
  block_Wo7gkfj5QDqEiXywi6e2dq: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 21,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'right',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.total}}',
      },
    },
  },
  block_YABuGb9jY34Rywk4H2wmhu: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_Wo7gkfj5QDqEiXywi6e2dq'],
      },
    },
  },
  block_95CFVehcWAjR5DpfJRawF6: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_VvK99ZhLLgmycHQXKVFV7E: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 4,
          bottom: 4,
          left: 0,
          right: 0,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_DPodDUHaaLcYuAG3CQi1F7'],
          },
          {
            childrenIds: ['block_YABuGb9jY34Rywk4H2wmhu'],
          },
          {
            childrenIds: ['block_95CFVehcWAjR5DpfJRawF6'],
          },
        ],
      },
    },
  },
  block_VhteQbJa7bCSmykN4AcHkp: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [
          'block_2QEX1chf5uWU5ZZebf4gmu',
          'block_Lu666sTP6hqLkHiBThmm4G',
          'block_Gn2h8bajFuW8zDBsiVVitV',
          'block_2xkeWLDtTXj5jFg57KhfYR',
          'block_QgSNshqbsUkk4FrRywjoRd',
          'block_VvK99ZhLLgmycHQXKVFV7E',
        ],
      },
    },
  },
  block_9MPJm4YxQrW5nt7APTB5Vx: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_WK3b19BzGE8VNKDwiSZ8s8: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 24,
          right: 24,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_Wnt477QxYNynetWGwkLg89'],
          },
          {
            childrenIds: ['block_VhteQbJa7bCSmykN4AcHkp'],
          },
          {
            childrenIds: ['block_9MPJm4YxQrW5nt7APTB5Vx'],
          },
        ],
      },
    },
  },
  block_Pe2Dm5Cbqq5CcjL5wEdMg4: {
    type: 'Heading',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 40,
          bottom: 24,
          left: 24,
          right: 24,
        },
      },
      props: {
        level: 'h3',
        text: 'Customer information',
      },
    },
  },
  block_2c68kHKvfEzD1DRVKqh4Pg: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 8,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Shipping address',
      },
    },
  },
  block_SY5nL8mzSPgeEyeDgkDUEa: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.shippingAddress.name}}\n{{order.shippingAddress.line1}}\n{{order.shippingAddress.city}}, {{order.shippingAddress.state}} {{order.shippingAddress.zip}}\n{{order.shippingAddress.country}}',
      },
    },
  },
  block_ThQEcRPtSMqKiThzU9EGwV: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_2c68kHKvfEzD1DRVKqh4Pg', 'block_SY5nL8mzSPgeEyeDgkDUEa'],
      },
    },
  },
  block_NkMSrWFvqewuenMYqLNcRa: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 8,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: 'Billing address',
      },
    },
  },
  block_7RTvDRNCQpM5xV6oXsCx6s: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        text: '{{order.shippingAddress.name}}\n{{order.shippingAddress.line1}}\n{{order.shippingAddress.city}}, {{order.shippingAddress.state}} {{order.shippingAddress.zip}}\n{{order.shippingAddress.country}}',
      },
    },
  },
  block_KaHi1FBV64emMA3kb7x4vE: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: ['block_NkMSrWFvqewuenMYqLNcRa', 'block_7RTvDRNCQpM5xV6oXsCx6s'],
      },
    },
  },
  block_PbayPF5XauTPe54KMAbdri: {
    type: 'Container',
    data: {
      style: {
        backgroundColor: null,
        borderColor: null,
        borderRadius: null,
        padding: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        },
      },
      props: {
        childrenIds: [],
      },
    },
  },
  block_SizNWJDCcqw9tGH2ComdDX: {
    type: 'ColumnsContainer',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 24,
          right: 24,
        },
      },
      props: {
        columnsCount: 2,
        columns: [
          {
            childrenIds: ['block_ThQEcRPtSMqKiThzU9EGwV'],
          },
          {
            childrenIds: ['block_KaHi1FBV64emMA3kb7x4vE'],
          },
          {
            childrenIds: ['block_PbayPF5XauTPe54KMAbdri'],
          },
        ],
      },
    },
  },
  block_4Qxv32WQo8pDzPu1d3vixz: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 16,
        fontFamily: null,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: {
          top: 24,
          bottom: 8,
          left: 24,
          right: 24,
        },
      },
      props: {
        text: 'Shipping method',
      },
    },
  },
  block_LKiZYDTPeJGkRWHForFSDQ: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 0,
          bottom: 48,
          left: 24,
          right: 24,
        },
      },
      props: {
        text: '{{order.shippingMethod}}',
      },
    },
  },
  block_P6XtJj721vPfrhXKzS8uR5: {
    type: 'Divider',
    data: {
      style: {
        backgroundColor: null,
        padding: {
          top: 16,
          bottom: 16,
          left: 0,
          right: 0,
        },
      },
      props: {
        lineHeight: 1,
        lineColor: '#5696e5',
      },
    },
  },
  block_AKTwpjBmtevcfj82z52i8p: {
    type: 'Text',
    data: {
      style: {
        color: null,
        backgroundColor: null,
        fontSize: 14,
        fontFamily: null,
        fontWeight: 'normal',
        textAlign: 'left',
        padding: {
          top: 16,
          bottom: 16,
          left: 24,
          right: 24,
        },
      },
      props: {
        text: 'If you have any questions, just reply to this email.\n\n[Edit or Cancel Order](https://www.example.com/orders/{{order.id}}/edit)\n\n[Reorder](https://www.example.com/orders/{{order.id}}/reorder)',
      },
    },
  },
};

export default ORDER_ECOMMERCE;
