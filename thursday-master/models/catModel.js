// ./models/catModel.js
'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllCats = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat');
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const getCat = async (id) => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM wop_cat WHERE cat_id = ?', [ id ]);
    return rows[0];
  } catch (e) {
    console.log('error', e.message);
  }
};

const insertCat = async (cat) => {
  try {
    console.log('insert cat?', cat)
    const [rows] = await promisePool.query('INSERT INTO wop_cat (name, age, weight, owner, filename) VALUES (?, ?, ?, ?, ?)',
        [ cat.name, cat.age, cat.weight, cat.owner, cat.filename ]);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
}

module.exports = {
  getAllCats,
  getCat,
  insertCat
};