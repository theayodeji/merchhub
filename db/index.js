import mongoose from "mongoose";

const dbConnect = async () => {
  const connectionUrl =
    "mongodb+srv://onesixteenj:25022002@ecom.kqvlk5g.mongodb.net/?retryWrites=true&w=majority&appName=ecom";

  mongoose
    .connect(connectionUrl,
      { })
    .then(() => console.log("Database connection sucessful!"))
    .catch((error) => {
      console.log(error);
    });
};

export default dbConnect;
