import { notion } from "../notion";
import { factory } from "../utils";

const getCertificationHandler = factory.createHandlers(async (c) => {
  const response = await notion.databases.query({
    database_id: process.env.NOTION_CERTIFICATION_DB_ID!,
    filter_properties: ["title", "NAy%5D", "%40vmy"],
  });

  const jsonData = {
    name: response.results[2].properties.Name.title[0].plain_text,
    image: response.results[2].properties.image.files[0].file.url,
    link: response.results[2].properties.link.rich_text[0].text.link.url,
  };
  return c.json({ certifications: jsonData });
});

export { getCertificationHandler };
