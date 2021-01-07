import mongoose from "mongoose";

const dbConnect = () => {
  if (mongoose.connections[0].readyState) {
    return console.log("Database Already Connected!!!!!");
  }

  console.log(process.env.MONGO_URI);
  const db = mongoose.connect(
    process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (err)
        return console.log(
          "Some Error Occured In Making Connection With Database"
        );
      return console.log("Database Connected");
    }
  );
};

export default dbConnect;
