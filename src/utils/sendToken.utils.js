export const sendToken = async (user) => {
  return await user.generateJWTLoginToken();
};
