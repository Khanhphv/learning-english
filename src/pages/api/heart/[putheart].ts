// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";
import path from "path";
type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: "John Doe" });
}

// const sheets = google.sheets("v4");

// const putHeart = async (spreadsheetId, range) => {
//   const auth = new google.auth.GoogleAuth({
//     keyFile: path.resolve("./constant/credentials.json"),
//     scopes: ["https://www.googleapis.com/auth/spreadsheets"],
//   });

//   google.options({ auth });

//   const res = await sheets.spreadsheets.values.update({
//     spreadsheetId,
//     range,
//     valueInputOption: "USER_ENTERED",
//     requestBody: {
//       values: [["1"]],
//     },
//   });
//   return res.data;
// };
// putHeart("11l2MvPp3h7MiFaf5svxGQFe84U8u-hmLNJPP-euziCg", "vocabolary!A2");
