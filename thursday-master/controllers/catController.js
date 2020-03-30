'use strict';
const catModel = require('../models/catModel');

const cats = catModel.cats;

const cat_list_get = async (req, res) => {
  const cats = await catModel.getAllCats();
  res.json(cats);
};

const cat_get = async (req, res) => {
  console.log('cat id parameter', req.params);
  const cat = await catModel.getCat(req.params.id); //cats.filter(cat => cat.id === req.params.id).pop();
  res.json(cat);
};

const cat_post = async (req, res) => {
  console.log('cat_post', req.body, req.file);
  const inCat = {
    name: req.body.name,
    age: req.body.age,
    weight: req.body.weight,
    owner: req.body.owner,
    filename: req.file.filename,
  };
  try {
    const cat = await catModel.insertCat(inCat);
    console.log('inserted', cat);
    res.send(`added cat: ${cat.insertId}`);
  } catch (e) {
    console.error('problem with cat_post in catController', e)
    res.status().send(`database insert error: ${e.message}`)
  }
};

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};
