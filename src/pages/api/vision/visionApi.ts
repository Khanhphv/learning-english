import { NextApiRequest, NextApiResponse } from 'next';
import { ImageAnnotatorClient } from '@google-cloud/vision';

const visionClient = new ImageAnnotatorClient();

interface GenerateImageRequest {
  text: string;
  width: number;
  height: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { text, width, height }: GenerateImageRequest = req.body;

  try {
    const response = await visionClient.textToImage({
      text,
      width,
      height,
      format: 'PNG',
    });

    const imageBuffer = response.image.content;
    res.setHeader('Content-Type', 'image/png');
    res.send(imageBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating image');
  }
}