const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');
// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  // passes check 
try {
    const tagData = await Tag.findAll({
      include : Product,
    });
    res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

router.get('/:id', async (req, res) => {
   // find a single tag by its `id`
  // be sure to include its associated Product data
  // passes check 
  try {
    const tag = await Tag.findByPk(req.params.id, { include: Product });

    if (!tag) {
      res.status(404).json({ message: "No tag found with that id"});
      return;
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  //passes check
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.json(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  //passes check 
  const tagID = req.params.id;
  const { tag_name } = req.body;

  try {
    const tag = await Tag.findByPk(tagID);
    if (!tag) {
      res.status(404).json({ message: "No tag found with this id"});
      return;
    }
    tag.tag_name = tag_name;
    await tag.save();
    res.json(tag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagId = req.params.id;
  const { tag_name } = req.body;
    
    try {
      const tag = await Tag.findByPk(tagId);
      if (!tag) {
        res.status(404).json({ message: "No tag found with this id" });
        return;
      }
      tag.tag_name = tag_name;
      await tag.save();

      res.json(tag);
    } catch (err) {
      res.status(400).json(err);
    }
});
  


module.exports = router;
