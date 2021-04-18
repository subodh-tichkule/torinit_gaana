export const validateEmail = (email) => {
  if (email.length < 1) {
    return 'Please enter an email address.';
  }
  if (!email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
    return 'Please enter a valid email address.';
  }
  return false;
};

export const validatePassword = (password) => {
  if (password.length < 1) {
    return 'Please enter password.';
  }
  return false;
};
