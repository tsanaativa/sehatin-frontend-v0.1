export const validate = (value: string, id: string) => {
  if (id == 'email') {
    if (!/^[\w.]+@([\w-]+\.)+[\w]{2,4}$/.test(value))
      return 'invalid email format';
  }
  if (id.endsWith('password')) {
    if (!/[A-Z]/.test(value))
      return 'password must contain at least 1 uppercase';
    else if (!/[a-z]/.test(value))
      return 'password must contain at least 1 lowercase';
    else if (!/\d/.test(value))
      return 'password must contain at least 1 number';
    else if (!/[\W+_]/.test(value))
      return 'password must contain at least 1 special character';
    else if (!/.{8,}/.test(value))
      return 'password must contain at least 8 characters';
    else if (!/^\S+$/.test(value)) return 'password cannot contain space';
  }
  if (id.includes('number')) {
    if (!/^\d+$/.test(value)) return 'this field only accepts number';
  }
  return '';
};
