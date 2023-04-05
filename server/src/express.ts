import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRouter from "./routes/auth.route";
import gigRouter from "./routes/gig.route";
import reviewRouter from "./routes/review.route";
import orderRouter from "./routes/order.route";

import { errorHandler } from "./middleware/errorhandler";
import { invalidRouteHandler } from "./middleware/norouteHandler";

const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["https://fiverr-clone-mauve.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);

// mount routes
app.use("/api/auth", authRouter);
app.use("/api/gigs", gigRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/orders", orderRouter);

app.use(errorHandler);

//If no route is matched by now, it must be a 404
app.use(invalidRouteHandler);

export default app;
