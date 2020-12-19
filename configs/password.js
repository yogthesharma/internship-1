import bcrypt from "bcrypt";

export const genPass = async (pass) => {
  console.log(pass);
  const hash = await bcrypt.hash(pass, 10);
  return { hash };
};

export const comparePass = async (pass, hash) => {
  await bcrypt.compare(pass, hash, function (err, res) {
    if (err) {
      return { err };
    } else {
      console.log(res);
      return res;
    }
  });
};
