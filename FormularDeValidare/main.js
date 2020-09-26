const form = document.getElementById('form');
const username = document.getElementById('Nume-Utilizator');
const email = document.getElementById('email');
const password = document.getElementById('parola');
const confirm_password = document.getElementById('confirmare-Parola');

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
    showError(input, 'Adresa de email nu este validă');
  }
}
function checkPasswordMatch(password, confirm_password) {
  if (password.value !== confirm_password.value) {
    showError(confirm_password, 'Parolele nu se potrivesc');
  }
}

function getFieldName(fieldName) {
  return fieldName.id.charAt(0).toUpperCase() + fieldName.id.slice(1);
}

function checkRequiredFields(inputArr) {
  inputArr.forEach(function (input) {
    if (input.value.trim() === '') {
      showError(input, ` ${getFieldName(input).replace('-', ' ')} este necesară`);
    }
    else {
      showSuccess(input);
    }
  });
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `Trebuie sa fie de cel puțin ${min} caractere`);
  } else if (input.value.length > max) {
    showError(input, `Trebuie să conțină mai puțin de ${max} caractere`);
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
