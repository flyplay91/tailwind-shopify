import { cacheDom }  from 'scripts/utils/QuerySelectors.js';

const dom = {};
const qs = {
  inputs: 'data-error-message',
  errorMessage: 'data-error-for',
};

const clearOldMessage = (input) => {
  input.classList.remove('input-invalid');
};

const setupFormFieldListener = (input) => {
  input.addEventListener('invalid', (event) => {
    // get our element parent to manipulate
    const targetParent = input.parentNode;
    // clear any old messages
    clearOldMessage(input);
    // add new message
    input.classList.add('input-invalid');
  });

  // on input change, remove old errors
  input.addEventListener('change', (event) => {
    const input = event.target;
    clearOldMessage(input);
  });
};

export const setupFormFields = () => {
  cacheDom(dom, {}, qs);
  dom.inputs.forEach((input) => setupFormFieldListener(input));
};
