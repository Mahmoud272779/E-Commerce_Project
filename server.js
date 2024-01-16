const express = require("express");
const dbConnection = require("./config/database");
const apiError = require("./utils/apiError");

const globalError = require("./Middlewares/errorMiddleware");

const app = express();
app.use(express.json());
const dotenv = require("dotenv");
const { categoryRouter } = require("./routes/categoryRoute");
const {subCategoryRouter}= require("./routes/subCategoryRoute");
const {BrandRouter} = require("./routes/brandRoute");

const morgan = require("morgan");

dotenv.config({ path: "config.env" });
dbConnection();
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/subcategories", subCategoryRouter);
app.use("/api/v1/brands", BrandRouter);

app.all("*", (req, res, next) => {
  next(new apiError(`Cant handle: ${req.originalUrl}`, 400));
});

app.use(globalError);

const server = app.listen(process.env.PORT, () => {
  console.log("Server is Listening .....");
});

// Handling rejections outside express like dbconnection
process.on("unhandledRejection", (err) => {
  console.error(`Unhandled Recjection Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down .....");
    process.exit(1);
  });
});
