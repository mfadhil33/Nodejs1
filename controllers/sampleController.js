// eslint-disable-next-line no-unused-vars
const express = require('express');

const methodGet = (req, res) => {
  res.send('hello');
};

// eslint-disable-next-line no-unused-vars
const methodPost = (req, res) => {
  res.send('hello(post)');
};

const methodPut = (req, res) => {
  res.send('Contoh menggunakan Put');
};
const methodDelete = (req, res) => {
  res.send('Contoh menggunakan delete');
};

module.exports = {
  methodGet,
  methodPost,
  methodPut,
  methodDelete,
};
