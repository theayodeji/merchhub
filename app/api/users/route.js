// pages/api/products/[id].js
import dbConnect from "../../../../db/index";
import User from '../../../../models/User';

export async function GET(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user', error });
  }
}

export async function PUT(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update user', error });
  }
}

export async function DELETE(req, res) {
  await dbConnect();

  const { id } = req.query;

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete user', error });
  }
}

export default async function handler(req, res) {
  if (req.method === 'GET') {
    return GET(req, res);
  } else if (req.method === 'PUT') {
    return PUT(req, res);
  } else if (req.method === 'DELETE') {
    return DELETE(req, res);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
