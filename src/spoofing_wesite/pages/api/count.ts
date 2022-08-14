// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { writeFile } from '../../utils/fs';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { event_name, ts, id } = JSON.parse(req.body);
  if (!event_name || !ts || !id) {
    res.status(404).json({ name: 'not found' })

    return
  }
  writeFile("count_log/" + event_name + "/" + id + ".txt", ts + " " + id + "\n", () => { })
  res.status(200).json({ name: 'save' })
}
