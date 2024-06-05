import { factory } from "../utils";
import { notion } from "../notion";

const getPageHandler = factory.createHandlers(async (c) => {
  try {
    const response = await notion.pages.retrieve({
      page_id: process.env.NOTION_PAGE_ID!,
    });
    return c.json({ data: response });
  } catch (error: any) {
    console.log(error.message);
  }
});

export { getPageHandler };
