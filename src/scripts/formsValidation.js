const forms = document.querySelectorAll('.form');

forms.forEach(form => {
  form.onsubmit = async (e) => {
    await validateForm(form);
    console.log('123');

    if(form.querySelectorAll('.input-error').length > 0) {
      e.preventDefault();
    }

  }

  // Custom event. If form in modal close, then reset form; (.modals.js)
  form.onclose = () => {
    const inputs = form.querySelectorAll('input');
    inputs.forEach(input => {
      input.value = '';
      removeInputError(input);
    })
  }
})

function validateForm(form) {
  return new Promise((resolve, reject) => {
    const inputs = form.querySelectorAll('input[data-validate-rule]');

    for (let i = 0; i <= inputs.length; i++) {
      if(i === inputs.length) {
        resolve('');
      }

      const input = inputs[i];
      validateInput(input);
    }
  })
}

function validateInput(input) {
  const ruleName = input.dataset.validateRule;
  const text = input.value;
  if(ruleName === 'name') {

    if(text.length === 0) {
      addInputError(input, "Ви не ввели своє ім'я");
    } else if(text.slice(' ').length === 2) {
      addInputError(input, "Ви повинні ввести ім'я та фамілію")
    } else {
      removeInputError(input);
    }

  }
  if(ruleName === 'email') {

    if(text.length === 0) {
      addInputError(input, 'Ви не ввели свій email');
    } else {
      removeInputError(input);
    }

  }
  if(ruleName === 'tel') {

    if(text.length === 0) {
      addInputError(input, 'Ви не ввели номер свого телефону');
    } else if(text.length < 16) {
      addInputError(input, 'Недостатня кількість символів')
      console.log('tel 2')
    } else {
      removeInputError(input)
    }

  }
}

function addInputError(input, text) {

  if(input.classList.contains('invalid')) {
    input.nextElementSibling.remove();
  }
  const error = document.createElement('div');
  error.textContent = text;
  error.className = 'input-error animate__animated animate__fadeIn';

  insertAfter(input, error);
  input.classList.add('invalid')
}
function removeInputError(input) {
  if(!input.classList.contains('invalid')) return;

  input.nextElementSibling.remove();
  input.classList.remove('invalid')
}

function insertAfter(referenceNode, newNode) {
  referenceNode.parentElement.insertBefore(newNode, referenceNode.nextSibling);
}
