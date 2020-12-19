import nc from "next-connect";
import dbConnect from "../../db/dbConnect";
import User from "../../models/User";

const handler = nc()
  .use((req, res, next) => {
    dbConnect();
    next();
  })
  .post(async (req, res) => {
    try {
      const { username } = req.body;
      const userItems = await User.findOne({ username });
      const sales = userItems.sales;
      res.json({ sales });
    } catch (error) {
      console.log(error);
    }
  });

export default handler;
