import nc from "next-connect";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/User";
import bcrypt from "bcrypt";
import cookie from "cookie";
import { generateToken } from "../../../configs/tokens";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .post(async (req, res) => {
    try {
      const { loginIdLogin, passwordLogin } = req.body;

      // extracting user from database
      const user = await User.findOne({ loginId: loginIdLogin });
      if (!user) {
        return res.json({
          msg: "Unable To Find The Username. Try Signing In Instead",
          errFlag: true,
        });
      }

      // checking for the password
      await bcrypt.compare(
        passwordLogin,
        user.hash,
        async function (err, result) {
          if (err) {
            return res.json({
              msg: "Some Error Occured ! Please Try Again Later....",
              errFlag: true,
            });
          } else {
            if (result) {
              const token = await generateToken(user);
              res.setHeader(
                "Set-Cookie",
                cookie.serialize("auth-token", token, {
                  maxAge: 24 * 60 * 60,
                  httpOnly: true,
                  path: "/",
                  secure: process.env.NODE_ENV === "production",
                  sameSite: "lax",
                })
              );
              return res.json({
                username: user.username,
                loginId: user.loginId,
                errFlag: false,
              });
            } else {
              return res.json({
                msg: "Incorrect Password",
                errFlag: true,
              });
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  });

export default handler;
