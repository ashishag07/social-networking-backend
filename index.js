// import external modules
import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

// import routes
import userRouter from "./src/features/user/routes/user.routes.js";
import postRouter from "./src/features/posts/routes/post.routes.js";
import commentsRouter from "./src/features/comments/routes/comments.routes.js";
import likesRouter from "./src/features/likes/routes/likes.routes.js";

// import middlewares
import { errorHandleMiddleware } from "./src/middlewares/errorHandle.middleware.js";
import { auth } from "./src/middlewares/auth.middleware.js";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/api", userRouter);
app.use("/api/posts", auth, postRouter);
app.use("/api/comments", auth, commentsRouter);
app.use("/api/likes", auth, likesRouter);
app.use(errorHandleMiddleware);
export default app;
