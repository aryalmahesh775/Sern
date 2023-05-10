import express from "express";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import connection from "./config/dbConfig";
import roleRouter from "./routes/roleRoutes";
import userRouter from "./routes/userRoutes";
import postRouter from "./routes/postRoutes";
import categoryRouter from "./routes/categoryRoutes";
import reviewRouter from "./routes/reviewRoutes";
import { error } from "console";
import { errorHandler, notFound } from "./middleware/errorHandler";
import path from "path";
const app = express();

const PORT = process.env.PORT || 5001;

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

// connection.sync({force:true}).then(() => {
//     console.log('drop and rebase')
// })

app.use("/uploads", express.static(path.join(path.resolve(), "/uploads")));

app.use("/api/user", userRouter);
app.use("/api/role", roleRouter);
app.use("/api/category", categoryRouter);
app.use("/api/post", postRouter);
app.use("/api/review", reviewRouter);

app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Hello there");
});

connection
  .authenticate()
  .then(() => {
    console.log("Connection successful ......");
    app.listen(PORT, () => {
      return console.log(`express is started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(`unable to establish connection .....`, error);
  });
