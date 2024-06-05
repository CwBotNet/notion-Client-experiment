import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// (async () => {
//   const response = await notion.databases.retrieve({
//     database_id: `${process.env.NOTION_DATABASE_ID!}`,
//   });
//   console.log(await response);
// })();

(async () => {
  const response = await notion.databases.query({
    database_id: `${process.env.NOTION_DATABASE_ID!}`,
  });
  const results = response.results;
  const filerData = await results
    // .filter((page) => {
    //   const nameProperty = page.properties.Name.title;
    //   const aboutProperty = page.properties.about.rich_text;
    //   return nameProperty.length > 0 && aboutProperty.lenght > 0;
    // })
    .map((page) => {
      const name = page.properties.Name.title[0].plane_text;
      const about = page.properties.about.rich_text[0].plain_text;
      return { name, about };
    });
  console.log(results, null, 2);
  console.log(results[0].properties.Name.title[0].plain_text, null, 2);
  console.log({ filterData: filerData }, null, 2);
})();
