
const regexName = /^[a-zA-Z0-9\s]*$/;
const regexNumber = /^\d+$/;

export function validation(data, key) {
  let errors = {};
  if (!regexName.test(data.name))
    errors.name = "The name must only contain letters and numbers";
  else if (!data.name) errors.name = "Name cannot be empty";
  else if (data.name.length > 30)
    errors.name = "Name cannot be longer than 30 characters";
  else if (key) errors.name = "Dog breed already exists";

  if (!regexNumber.test(data.height_min) || !regexNumber.test(data.height_max) )errors.height = "The height must only contain positives numbers (not symbols, not letters)"

  if (!regexNumber.test(data.weight_min) || !regexNumber.test(data.weight_max))errors.weight = "The weight must only contain positives numbers (not symbols, not letters)"

  if (!regexNumber.test(data.life_min)|| !regexNumber.test(data.life_max))errors.life = "The life must only contain positives numbers (not symbols, not letters)"

  return errors;
}
