const express = require('express');
const router = express.Router();
const Article = require('../models/article');

//to create a new article
router.post('/articles', async (req, res) => {
    try{
        const article = new Article(req.body);
        await article.save();
        res.status(201).json(article);

    }   catch(error) {
        res.status(400).json({error:error.message});
    }
});

// Get all the articles
router.get('/articles', async (req, res) => {
    try{
        const articles = await Article.find();
        res.status(200).json(articles);

    }   catch(error) {
        res.status(400).json({error:error.message});
    }
});

// fetch a single article by ID
router.get('/articles/:id', async (req, res) => {
    try {
      const article = await Article.findById(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });
      res.status(200).json(article);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Update an article by ID
  router.put('/articles/:id', async (req, res) => {
    try {
      const article = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!article) return res.status(404).json({ error: 'Article not found' });
      res.status(200).json(article);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  
  // Delete an article by ID
  router.delete('/articles/:id', async (req, res) => {
    try {
      const article = await Article.findByIdAndDelete(req.params.id);
      if (!article) return res.status(404).json({ error: 'Article not found' });
      res.status(200).json({ message: 'Article deleted' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  module.exports = router;
  