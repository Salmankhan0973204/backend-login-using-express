const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
const port = process.env.PORT || 3002; // Port number, default to 3000
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("done"))
  .catch((err) => console.log(err));

// routers
app.use("/api/user", userRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
