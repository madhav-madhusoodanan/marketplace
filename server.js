require("dotenv").config();
// required for the database url
const express = require("express");
const mongoose = require("mongoose");
const app = express();

const PORT = process.env.PORT || 6969;
app.use(express.json());

/* routes:
 * 1. login page
 * 2. profile page
 * 3. marketplace page
 * 4. bidding page // with an extra section for the seller to choose bids
 * 6. if possible, intro page too
 * 
 *
 * for all the routes except the "join" route,
 * request header of ->
 * authorization : BEARER <accesstoken> 
 * 
 * must be used
 * accesstoken can be obtained from the join page
 */
app.get("/", (req, res) => {
  res.send("hello!");
});
app.use("/join", require("./routes/join.js"));
app.use("/profile", require("./routes/profile"));
app.use("/feed", require("./routes/feed"));
app.use("/feed", require("./routes/bidding"));

mongoose
  .connect(process.env.CONNECTION_URL, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then((result) =>
    app.listen(PORT, () => {
      console.log(`Listening to port ${PORT}...`);
    })
  );
