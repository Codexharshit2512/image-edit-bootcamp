import { checkEmail, checkPassword, checkName } from "./validationUtils";

export const validateSignUp = (email, name, password) => {
  let errors = [];
  let emailError = checkEmail(email);
  if (emailError) {
    errors.push(emailError);
  }
  let nameError = checkName(name);
  if (nameError) {
    errors.push(nameError);
  }
  const passwordError = checkPassword(password);
  if (passwordError) errors.push(passwordError);

  if (errors.length == 0) return { errors: null };
  else return { errors };
};

export const validateLogin = (email, password) => {
  let errors = [];
  let emailError = checkEmail(email);
  if (emailError) {
    errors.push(emailError);
  }
  const passwordError = checkPassword(password);
  if (passwordError) errors.push(passwordError);

  if (errors.length == 0) return { errors: null };
  else return { errors };
};
