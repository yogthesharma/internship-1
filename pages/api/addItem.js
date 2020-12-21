import nc from "next-connect";
import Items from "../../models/Items";
import dbConnect from "../../db/dbConnect";

const handler = nc()
  .use(async (req, res, next) => {
    await dbConnect();
    next();
  })
  .get(async (req, res) => {
    try {
      await Items.find({}, (err, items) => {
        if (err) console.log(err);
        return res.json({ items });
      });
    } catch (error) {
      res.json({ error });
    }
  })
  .post(async (req, res) => {
    const { item, price } = req.body;
    const itemToBeSave = await new Items({
      item,
      price,
    });

    await itemToBeSave
      .save()
      .then((item) => {
        console.log(item);
        return res.json({ msg: "Item Saved", errFlag: false });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Item Saved", errFlag: false });
      });
  });

export default handler;
