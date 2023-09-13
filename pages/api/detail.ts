import { NextApiRequest, NextApiResponse } from 'next';
import { Client } from '@notionhq/client';

const notionSecret = process.env.NOTION_SECRET;
const notionDatabaseId = process.env.NOTION_DATABASE_ID;

const notion = new Client({
  auth: notionSecret,
});

async function getDetail(pageId: string, propertyId: string) {
  try {
    const response = await notion.pages.properties.retrieve({
      page_id: pageId,
      property_id: propertyId,
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error(JSON.stringify(error));
  }
}

type Data = {
  detail?: any;
  message: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  const { pageId, propertyId } = req.query;
  try {
    const response = await getDetail(String(pageId), String(propertyId));
    res.status(200).json({ detail: response, message: `Success` });
  } catch (error) {
    res.status(400).json({ message: `Failed ${name} added` });
  }
}
