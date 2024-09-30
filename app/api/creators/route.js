// pages/api/creators/index.js
import dbConnect from '@/db/index';
import Creator from '@/models/Creator';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const creators = await Creator.find({});
    res.status(200).json(creators);
  } else if (req.method === 'POST') {
    const creator = new Creator(req.body);
    await creator.save();
    res.status(201).json(creator);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
