import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  const id = user._id;
  const payload = {
    id,
    expTime: "1d",
  };
  const token = jwt.sign(payload, "secret");
  return token;
};
export const verifyToken = async (token) => {
  const decoded = await jwt.verify(token, "secret");
  return decoded;
};
