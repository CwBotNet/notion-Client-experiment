import { Hono } from "hono";
import {
  getCertificationHandler,
  getEducationHandler,
  getPageHandler,
  getProjectHandler,
  getTestimonialsHandler,
  getUserData,
  getUserHandler,
  postContactHandler,
  postTestimonialsHandler,
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
app.get("/certification", ...getCertificationHandler);

// project data
app.get("/project", ...getProjectHandler);

// testimonial data
app.get("/testimonial", ...getTestimonialsHandler);
app.post("/testimonial", ...postTestimonialsHandler);

// contact data
app.post("/contact", ...postContactHandler);

// page data
app.get("/page", ...getPageHandler);

export default app;
