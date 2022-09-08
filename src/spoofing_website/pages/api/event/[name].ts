// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { readFile } from '../../../utils/fs';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const file = await readFile("log/" + req.query.name + "/" + "index.txt");
    const array = file.toString().split("\n").map(item => {
      if (item === "") {
        return
      }
      const [date, time, name] = item.split(" ")
      return { date, time, name }
    })
    array.pop()
    res.status(200).send({ log: array, txt: file.toString() })
  } catch (error) {
    res.status(200).send({ log: [], txt: "記録なし" })

  }

}
