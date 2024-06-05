import { notion } from "../notion";
import { factory } from "../utils";

const getUserHandler = factory.createHandlers(async (c) => {
  try {
    const response = await notion.users.list({});
    return c.json({ dato: response });
  } catch (error: any) {
    console.log(error.message);
  }
});

const getUserData = factory.createHandlers(async (c) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_USER_DB_ID!,
      filter_properties: ["title", "%3A%7DQ%5E"],
    });

    const userData = {
      name: response.results[1].properties.Name.title[0].plain_text,
      about: response.results[1].properties.about.rich_text[0].plain_text,
    };
    return c.json({
      data: userData,
    });
  } catch (error: any) {
    console.log(error.message);
  }
});

export { getUserHandler, getUserData };
