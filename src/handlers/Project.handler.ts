import { factory } from "../utils";
import { notion } from "../notion";

const getProjectHandler = factory.createHandlers(async (c) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_PROJECT_DB_ID!,
      filter_properties: ["M%3Fbg", "x%3CHJ", "%7BrMD", "title"],
    });

    const jsonData = {
      name: response.results[0].properties.Name.title[0].plain_text,
      imagelink: response.results[0].properties.image.files[0].file.url,
      description:
        response.results[0].properties.Description.rich_text[0].plain_text,
      stack: response.results[0].properties.stack.multi_select,
    };

    return c.json({ projects: jsonData });
  } catch (error: any) {
    console.log({ error: error.message });
  }
});

export { getProjectHandler };
