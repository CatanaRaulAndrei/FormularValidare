const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirm_password = document.getElementById('confirm-password');

function showError(input, message) {
  const form_control = input.parentElement;
  form_control.className = 'form-control error';
  const small = form_control.querySelector('small');
  small.innerText = message;
}

function showSuccess(input) {
  const form_control = input.parentElement;
  form_control.className = 'form-control success';
}

function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}
function checkPasswordMatch(password, confirm_password) {
  if (password.value !== confirm_password.value) {
    showError(confirm_password, ' Passwords do not match');
  }
}

function getFieldName(fieldName) {
  return fieldName.id.charAt(0).toUpperCase() + fieldName.id.slice(1);
}

function checkRequiredFields(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, ` ${getFieldName(input).replace('-', ' ')} is required`);
    }
    else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getFieldName(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

form.addEventListener('submit', function (e) {
  e.preventDefault();
  checkRequiredFields([username, email, password, confirm_password]);
  checkLength(username, 3, 15);
  checkLength(password, 8, 50);
  checkEmail(email);
  checkPasswordMatch(password, confirm_password);
});
