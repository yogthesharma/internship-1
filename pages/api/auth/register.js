import nc from "next-connect";
import { genPass } from "../../../configs/password";
import { generateToken } from "../../../configs/tokens";
import dbConnect from "../../../db/dbConnect";
import User from "../../../models/User";
import cookie from "cookie";

const handler = nc()
  .use((req, res, next) => {
    dbConnect();
    next();
  })
  .get(async (req, res, next) => {
    const users = await User.find({});
    let usernames = new Array();
    users.map((user) => usernames.push(user.username));
    res.json({ usernames });
  })
  .post(async (req, res) => {
    const { username, loginId, password } = req.body;

    if ((!username, !loginId, !password)) {
      return res.json({ msg: "All Fields Are Required", errFlag: true });
    }

    const hashedPass = await genPass(password);
    const hash = hashedPass.hash;

    const user = await new User({
      username,
      loginId,
      hash,
    });

    await user
      .save()
      .then(async (result) => {
        const token = await generateToken(user);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("auth-token", token, {
            httpOnly: true,
            path: "/",
            secure: process.env.NODE_ENV === "production",
          })
        );
        return res.json({
          username: result.username,
          loginId: result.loginId,
          errFlag: false,
        });
      })
      .catch((err) => {
        return res.json({ err, errFlag: true });
      });
  })
  .patch(async (req, res) => {
    let { loginId, price, item, date, qty } = req.body;
    let newQty = parseInt(qty);
    const user = await User.findOneAndUpdate({ loginId })
      .then(async (user) => {
        user.sales.push({ price, item, date, newQty });
        await user.save();
        res.status(201);
      })
      .catch((err) => {
        console.log(err);
      });
  });

export default handler;
