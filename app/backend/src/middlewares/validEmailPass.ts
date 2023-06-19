class ValidationUtils {
  static validEmail(email: string): boolean {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexEmail.test(email);
  }

  static validPassword(password: string): boolean {
    return password.length >= 6;
  }
}

export default ValidationUtils;
