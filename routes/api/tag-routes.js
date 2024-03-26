const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const sequelize = require('../../config/connection');
// The `/api/tags` endpoint

// get route to find all tag and include its associated Product data
router.get('/', async (req, res) => { 
try {
    const tagData = await Tag.findAll({
      include : Product,
    });
    res.status(200).json(tagData);
} catch (err) {
  res.status(500).json(err);
}
});

// get route to find a single tag by its id, and include its associated Product data
router.get('/:id', async (req, res) => {
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

// post route to create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(200).json(tagData);
  } catch (err) {
    res.json(400).json(err);
  }
});

// put route to update a tag by its id value
router.put('/:id', async (req, res) => {
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

// delete route for a specific tag by its id value
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!tagData) {
      res.status(404).json({ message: "No tag with that id found" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});
  


module.exports = router;
