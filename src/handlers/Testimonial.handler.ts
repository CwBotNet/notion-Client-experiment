import { factory } from "../utils";
import { notion } from "../notion";

const postTestimonialsHandler = factory.createHandlers(async (c) => {
  const formdata = await c.req.parseBody();
  //   console.log(formdata);
  const { name, company, content } = formdata;
  try {
    const response = await notion.pages.create({
      parent: {
        database_id: process.env.NOTION_TESTIMONIALS_DB_ID!,
      },
      properties: {
        Name: {
          title: [{ text: { content: name } }],
        },
        company: {
          rich_text: [{ type: "text", text: { content: company } }],
        },
        content: {
          rich_text: [{ type: "text", text: { content: content } }],
        },
      },
    });
    return c.json({ res: response }, 200);
  } catch (error: any) {
    console.log({ error: error });
  }
});
const getTestimonialsHandler = factory.createHandlers(async (c) => {
  try {
    const response = await notion.databases.query({
      database_id: process.env.NOTION_TESTIMONIALS_DB_ID!,
      filter_properties: ["cgY%7D", "q%7Cce", "title"],
    });
    const jsonData = {
      name: response.results[0].properties.Name.title[0].plain_text,
      company: response.results[0].properties.company.rich_text[0].plain_text,
      content: response.results[0].properties.content.rich_text[0].plain_text,
    };
    return c.json({ testimonials: jsonData });
  } catch (error: any) {
    console.log({ error: error.message });
  }
});

export { getTestimonialsHandler, postTestimonialsHandler };
