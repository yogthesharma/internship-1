import nc from "next-connect";
import cookie from "cookie";
import { verifyToken } from "../../configs/tokens";
import User from "../../models/User";

const handler = nc().get(async (req, res) => {
  try {
    if (!req.headers.cookie) {
      return res.json({ user: { status: false } });
    }

    const cookieFetched = cookie.parse(req.headers?.cookie);
    const token = cookieFetched["auth-token"];
    const decoded = await verifyToken(token);
    const user = await User.findById(decoded.id);
    if (user) {
      console.log(user.loginId, user.username);
      return res.json({
        user: { username: user.username, loginId: user.loginId, status: true },
      });
    } else {
      return res.json({ user: { status: false } });
    }
  } catch (error) {
    console.log(error);
  }
});

export default handler;
