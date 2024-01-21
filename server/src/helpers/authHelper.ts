import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  try {
    const length = 10;
    const hashedPassword = await bcrypt.hash(password, length);
    return hashedPassword;
  } catch (error) {
    console.log(error);
    return "";
  }
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
