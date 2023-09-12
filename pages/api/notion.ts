import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
});

async function addItems(name: string) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: notionDatabaseId || '' },
      properties: {
        title: [
          {
            text: {
              content: name,
            },
          },
        ],
      },
    });
    console.log(response);
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { name } = req.query;
  if (name === null) {
    return res.status(400).json({ message: 'No name' });
  }
  try {
    await addItems(String(name));
    res.status(200).json({ message: `Success ${name} added` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` });
  }
}
