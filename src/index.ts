import { Hono } from "hono";
import {
  getEducationHandler,
  getPageHandler,
  getUserData,
  getUserHandler,
  postContactHandler,
} from "./handlers";
import * as dotenv from "dotenv";
dotenv.config();
const app = new Hono();

app.get("/", (c) => {
  return c.text("hello hono");
});
// user data
app.get("user-details", ...getUserHandler);
app.get("/user", ...getUserData);

// education data
app.get("/education", ...getEducationHandler);

// certification data
app.get("/certification");

// project data
app.get("/project");

// testimonial data
app.get("/testimonial");

// contact data
app.post("/contact", ...postContactHandler);

// page data
app.get("/page", ...getPageHandler);

export default app;
