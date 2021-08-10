import colors from "colors";
import express from "express";
import path from "path";
import connectDB from "./config/db.js";
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

// Import Routes :
import usersRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import postsRoutes from "./routes/postsRoutes.js";

const app = express();
// Connect DataBase :
connectDB();

// Init Middlewares
app.use(express.json({ extended: false }));

// Define Routes :
app.use("/api/users", usersRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/posts", postsRoutes);

if (process.env.NODE_ENV === "production") {
  //Set static folder :
  app.use(express.static(path.resolve(__dirname, "client", "build")));
  app.get("*", (res, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("API Running ..."));
}

// Init Error Middlewares :
app.use(notFound);
app.use(errorHandler);

// Listen Server :
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server stared on port ${PORT}`.yellow.bold)
);
