import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import { Request, Response } from "express";
import userRoutes from "./routes/userRoutes";
import accommodationRoutes from "./routes/AccommodationRoute";
import accommodationImageRoutes from "./routes/accommodationImageRoutes";
import villageRoutes from "./routes/villageRoutes";
import districtRotes from "./routes/districtRoutes";
import provinceRoutes from "./routes/provinceRoutes";
import ingredientRoutes from "./routes/IngredientRoutes";
import foodRoutes from "./routes/FoodRoutes";
import foodImageRoutes from "./routes/foodImageRoutes";
import exchangneRoutes from "./routes/ExchangeRateRoutes";
import guideRoutes from "./routes/guideRoutes";
import KindOfPackageRoutes from "./routes/KindOfPackageRoutes";
import nationalitiesRoutes from "./routes/nationalityRoutes";
import registerFormEmailRoutes from "./routes/registerFormToBookRoutes";
import transportationRoutes from "./routes/transportationRoutes";
import typetransportationRoutes from "./routes/typeTransportationRoutes";
import packageRoutes from "./routes/packageRoutes";
import packageImageRoutes from "./routes/package_imagesRoutes";
import paymentRoutes from "./routes/paymentRoutes";
import oderRoutes from "./routes/orderRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import viewerRatingRoutes from "./routes/viewerRatingRoutes";
import authRoutes from "./routes/authRoutes"; // นำเข้าจาก authRoutes.ts
import config from "./config/ormconfig"; // นำเข้าจาก ormconfig.ts
import dotenv from "dotenv";
import cors = require("cors");
dotenv.config();
const PORT = process.env.SERVER_PORT;
const app = express();
app.use(express.json());
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/users", userRoutes); // Use user routes
app.use("/accommodation", accommodationRoutes); // เส้นทางสำหรับ accommodation
app.use("/village", villageRoutes); // เส้นทางสำหรับ village
app.use("/district", districtRotes); // เส้นทางสำหรับ district
app.use("/province", provinceRoutes); // เส้นทางสำหรับ province
app.use("/accommodationImage", accommodationImageRoutes); // เส้นทางสำหรับ accommodationImage
app.use("/ingredient", ingredientRoutes); // เส้นทางสำหรับ accommodationImage
app.use("/food", foodRoutes); // เส้นทางสำหรับ accommodationImage
app.use("/foodImage", foodImageRoutes); // เส้นทางสำหรับ accommodationImage
app.use("/exchangerate", exchangneRoutes);
app.use("/guide", guideRoutes);
app.use("/kindofpackage", KindOfPackageRoutes);
app.use("/nationality", nationalitiesRoutes);
app.use("/registerform", registerFormEmailRoutes);
app.use("/transportation", transportationRoutes);
app.use("/type_transportation", typetransportationRoutes);
app.use("/packages", packageRoutes);
app.use("/packageImage", packageImageRoutes);
app.use("/notification", notificationRoutes);
app.use("/viewer", viewerRatingRoutes);
app.use("/payment", paymentRoutes);
app.use("/orders", oderRoutes);
app.use('/auth', authRoutes);  // เชื่อมต่อเส้นทางการตรวจสอบ token

// เชื่อมต่อกับฐานข้อมูล
createConnection(config)
  .then(() => {
    console.log("Connected to the database");
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my website!!!");
});

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(`✅ Server is running on http://0.0.0.0:${PORT}`);
});
