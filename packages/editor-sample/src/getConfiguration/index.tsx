import ONE_TIME_PASSCODE from './sample/one-time-passcode';
import ORDER_ECOMMERCE from './sample/order-ecommerce';
import POST_METRICS_REPORT from './sample/post-metrics-report';
import RESERVATION_REMINDER from './sample/reservation-reminder';
import RESET_PASSWORD from './sample/reset-password';
import RESPOND_TO_MESSAGE from './sample/respond-to-message';
import SUBSCRIPTION_RECEIPT from './sample/subscription-receipt';

export default function getConfiguration() {
  const hash = window.location.hash;
  if (hash.startsWith('#sample/')) {
    const sampleName = hash.replace('#sample/', '');
    switch (sampleName) {
      case 'one-time-password':
        return ONE_TIME_PASSCODE;
      case 'order-ecomerce':
        return ORDER_ECOMMERCE;
      case 'post-metrics-report':
        return POST_METRICS_REPORT;
      case 'reservation-reminder':
        return RESERVATION_REMINDER;
      case 'reset-password':
        return RESET_PASSWORD;
      case 'respond-to-message':
        return RESPOND_TO_MESSAGE;
      case 'subscription-receipt':
        return SUBSCRIPTION_RECEIPT;
    }

    console.error('Invalid sample configuration');
  }

  if (hash.startsWith('#')) {
    const encodedString = window.location.hash.slice(1);
    const configurationString = atob(encodedString);
    try {
      return JSON.parse(configurationString);
    } catch {
      console.error(`Couldn't load configuration from hash.`);
    }
  }

  const configurationString = localStorage.getItem('configuration');
  if (typeof configurationString === 'string') {
    try {
      return JSON.parse(configurationString);
    } catch {
      console.error(`Couldn't load configuration from localStorage.`);
    }
  }

  return {
    root: {
      type: 'EmailLayout',
      data: {
        backdropColor: '#e5e7e5',
        canvasColor: '#FFFFFF',
        textColor: '#242424',
        accentColor: '#0b5499',
        fontFamily: 'MODERN_SANS',
        childrenIds: [],
      },
    },
  };
}
