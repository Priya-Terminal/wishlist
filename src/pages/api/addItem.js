import { items } from '../../data';

export default (req, res) => {
  if (req.method === 'POST') {
    const { link } = req.body;
    const newItem = { id: items.length + 1, link };
    items.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.status(405).end();
  }
};

