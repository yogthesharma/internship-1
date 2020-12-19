import nc from "next-connect";
import cookie from "cookie";

const handler = nc().get(async (req, res) => {
  try {
    await res.setHeader(
      "Set-Cookie",
      cookie.serialize("auth-token", "empty", {
        maxAge: 0,
        httpOnly: true,
        path: "/",
      })
    );
    res.status(204).end();
  } catch (error) {
    console.log(error);
  }
});

export default handler;
