import { trackPageView } from './libs/analytics';
import { getExchangeRate } from './libs/currency';
import { isValidEmail, sendEmail } from './libs/email';
import { charge } from './libs/payment';
import security from './libs/security';
import { getShippingQuote } from './libs/shipping';

// Lesson: Mocking modules
export function getPriceInCurrency (price, currency) {
  const rate = getExchangeRate('USD', currency);
  return price * rate;
}

// Exercise
export function getShippingInfo (destination) {
  const quote = getShippingQuote(destination);
  if (!quote) return 'Shipping Unavailable';
  return `Shipping Cost: $${quote.cost} (${quote.estimatedDays} Days)`;
}

// Lesson: Interaction testing
export async function renderPage () {
  trackPageView('/home');

  return '<div>content</div>';
}

// Exercise
export async function submitOrder (order, creditCard) {
  const paymentResult = await charge(creditCard, order.totalAmount);

  if (paymentResult.status === 'failed') {
    return { success: false, error: 'payment_error' };
  }

  return { success: true };
}

// Lesson: Partial mocking
export async function signUp (email) {
  if (!isValidEmail(email)) return false;

  await sendEmail(email, 'Welcome aboard!');

  return true;
}

// Lesson: Spying on functions
export async function login (email) {
  const code = security.generateCode();

  await sendEmail(email, code.toString());
}
