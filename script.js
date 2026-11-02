'use strict';

function calculateTip(billText, tipText, peopleText) {
  const bill = Number(billText);
  const rate = Number(tipText);
  const people = Number(peopleText);
  if (String(billText).trim() === '' || !Number.isFinite(bill) || bill < 0) {
    return { error: 'Please enter a bill amount of 0 or more.', field: 'bill' };
  }
  if (String(peopleText).trim() === '' || !Number.isSafeInteger(people) || people <= 0) {
    return { error: 'Please enter a whole number of people, at least 1.', field: 'people' };
  }
  if (![10, 15, 20].includes(rate)) {
    return { error: 'Please select a tip of 10%, 15%, or 20%.', field: 'tip' };
  }
  const tip = bill * (rate / 100);
  const total = bill + tip;
  // Keep fixed-point output readable and avoid overflow or exponential notation.
  if (!Number.isFinite(total) || total >= 1e15) {
    return { error: 'That bill is too large. Please enter a smaller amount.', field: 'bill' };
  }
  return { tip: tip.toFixed(2), total: total.toFixed(2), perPerson: (total / people).toFixed(2) };
}

if (typeof document !== 'undefined') {
  const form = document.getElementById('calculator');
  const fields = ['bill', 'tip', 'people'].map(id => document.getElementById(id));
  const outputs = ['tip-amount', 'total', 'per-person'].map(id => document.getElementById(id));
  const error = document.getElementById('error');
  function clear() {
    error.textContent = '';
    fields.forEach(field => field.removeAttribute('aria-invalid'));
    outputs.forEach(output => { output.textContent = '—'; });
  }
  form.addEventListener('input', clear);
  form.addEventListener('change', clear);
  form.addEventListener('submit', event => {
    event.preventDefault();
    clear();
    const result = calculateTip(...fields.map(field => field.value));
    if (result.error) {
      error.textContent = result.error;
      const invalid = document.getElementById(result.field);
      invalid.setAttribute('aria-invalid', 'true');
      invalid.focus();
      return;
    }
    [result.tip, result.total, result.perPerson].forEach((value, i) => { outputs[i].textContent = value; });
  });
}

if (typeof module !== 'undefined' && module.exports) module.exports = { calculateTip };
