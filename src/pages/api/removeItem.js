import { items } from '../../data';

export default (req, res) => {
  if (req.method === 'DELETE') {
    const itemId = req.body.id;

    const itemIndex = items.findIndex((item) => item.id === itemId);

    if (itemIndex !== -1) {
     
      items.splice(itemIndex, 1);

      res.status(200).json(items);
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
};

