// Author: Rishab, Charlotte, Craig

import bcrypt from "bcryptjs-react";

const saltValue = 10;

// to hash password
export const hashPassword = (password) => {
  const hashedPassword = bcrypt.hashSync(password, saltValue);
  return hashedPassword;
};

// to compare password
export const comparePassword = (password, hashedPassword) => {
  const isMatch = bcrypt.compareSync(password, hashedPassword);
  return isMatch;
};
