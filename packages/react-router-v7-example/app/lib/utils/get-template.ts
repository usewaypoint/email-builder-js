import EMPTY_EMAIL_MESSAGE from '~/components/templates/empty-email-message';
import ONE_TIME_PASSCODE from '~/components/templates/one-time-passcode';
import ORDER_ECOMMERCE from '~/components/templates/order-ecommerce';
import POST_METRICS_REPORT from '~/components/templates/post-metrics-report';
import RESERVATION_REMINDER from '~/components/templates/reservation-reminder';
import RESET_PASSWORD from '~/components/templates/reset-password';
import RESPOND_TO_MESSAGE from '~/components/templates/respond-to-message';
import SUBSCRIPTION_RECEIPT from '~/components/templates/subscription-receipt';
import WELCOME from '~/components/templates/welcome';
import { resetDocument } from '~/context/editor';
import type { TEditorConfiguration } from '~/documents/editor/core';

export const templateOptions = [
  {
    value: 'EMPTY_EMAIL_MESSAGE',
    title: 'Empty',
  },
  {
    value: 'WELCOME',
    title: 'Welcome email',
  },
  {
    value: 'ONE_TIME_PASSCODE',
    title: 'One-time passcode (OTP)',
  },
  {
    value: 'RESET_PASSWORD',
    title: 'Reset password',
  },
  {
    value: 'ORDER_ECOMMERCE',
    title: 'E-commerce receipt',
  },
  {
    value: 'SUBSCRIPTION_RECEIPT',
    title: 'Subscription receipt',
  },
  {
    value: 'RESERVATION_REMINDER',
    title: 'Reservation reminder',
  },
  {
    value: 'POST_METRICS_REPORT',
    title: 'Post metrics',
  },
  {
    value: 'RESPOND_TO_MESSAGE',
    title: 'Respond to inquiry',
  },
] as const;

export function getTemplate(templateString: string) {
  switch (templateString) {
    case 'EMPTY_EMAIL_MESSAGE':
      return EMPTY_EMAIL_MESSAGE;
    case 'ONE_TIME_PASSCODE':
      return ONE_TIME_PASSCODE;
    case 'ORDER_ECOMMERCE':
      return ORDER_ECOMMERCE;
    case 'POST_METRICS_REPORT':
      return POST_METRICS_REPORT;
    case 'RESERVATION_REMINDER':
      return RESERVATION_REMINDER;
    case 'RESET_PASSWORD':
      return RESET_PASSWORD;
    case 'RESPOND_TO_MESSAGE':
      return RESPOND_TO_MESSAGE;
    case 'SUBSCRIPTION_RECEIPT':
      return SUBSCRIPTION_RECEIPT;
    case 'WELCOME':
      return WELCOME;
    default:
      console.warn(`Unknown templateString: ${templateString}`);
      return EMPTY_EMAIL_MESSAGE;
  }
}

export function generateSharedDocument(document: TEditorConfiguration) {
  const code = encodeURIComponent(JSON.stringify(document));
  return `#code/${btoa(code)}`;
}

export function restoreSharedDocument(template: string) {
  const encodedString = template.replace('#code/', '');
  const configurationString = decodeURIComponent(atob(encodedString));
  try {
    return resetDocument(JSON.parse(configurationString));
  } catch {
    console.error(`Couldn't load configuration from hash.`);
  }
}
