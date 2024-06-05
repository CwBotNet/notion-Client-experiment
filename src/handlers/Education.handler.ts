import { notion } from "../notion";
import { factory } from "../utils";

const getEducationHandler = factory.createHandlers(async (c) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_EDUCATION_DB_ID!,
  });

  const structureData = {
    collage: response.results[1].properties.Name.title[0].plain_text,
    study: response.results[1].properties.course.rich_text[0].plain_text,
  };
  return c.json({ education: structureData });
});

export { getEducationHandler };
