// const { Op } = require('sequelize');
// const { isNull } = require('lodash');
const foodsModel = require('../models/foodsModel');
const potoModel = require('../models/potoModel');
const upload = require('../helper/fileUpload');

const getProductCondition = async (req, res) => {
  // const { namamakan } = req.body;

  try {
    const getData = await foodsModel.findAll({
      attributes: [['namamakan', 'name foods'], ['deskripsi', 'description']],
      // where: {
      //   [Op.or]: [
      //     { namamakan },
      //     { daerah },
      //   ],
      // },
      // namamakan: {
      //   // eslint-disable-next-line prefer-template
      //   [Op.like]: [
      //     `%${namamakan}%`,
      //   ],
      // },

      // menampilkan secara ascending
      // desc menampilkan secara descending
      // order: [['namamakan', 'desc']],
    });
    res.json(getData);
  } catch (err) {
    return res.status(400).sen({ message: 'error' });
  }
};

const uploadFoods = async (req, res) => {
  try {
    // for upload file

    await upload(req, res);
    const { body, file } = req;

    if (file === undefined) {
      return res.status(400).send({ message: 'image belum dipilih' });
    }
    // for db
    potoModel.create({
      idfoods: body.idfoods,
      path: file.originalname,
    }).then((data) => {
      res.status(200).send({
        message: `File berhasil upload ${data.path}`,
      });
    });
  } catch (error) {
    console.error(error.message);
    res.status(400).send('Gagal Upload file');
  }
};

const addFoods = async (req, res) => {
  try {
    const { namamakan, daerah, deskripsi } = req.body;
    // eslint-disable-next-line new-cap
    const store = new foodsModel({
      namamakan, daerah, deskripsi,
    });
    await store.save();
    res.json(store);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Error');
  }
};

const getAllProducts = async (req, res) => {
  try {
    const getData = await foodsModel.findAll({});
    res.json(getData);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('error');
  }
};

const getProductID = async (req, res) => {
  const { id } = req.params;

  // try {
  //   const getData = await foodsModel.findOne({ where: { id } });
  //   res.json(getData);
  // } catch (err) {
  //   console.error(`Data is ${err.message}`);
  // }
  try {
    const selectId = id;
    const data = await foodsModel.findByPk(selectId);
    // eslint-disable-next-line no-unneeded-ternary
    const result = data ? data : `${id}  not found in db`;
    res.json(result).status(200);
  } catch (error) {
    res.json(error.message()).status(422);
  }
};

const updateProductId = async (req, res) => {
  const { namamakan, daerah, deskripsi } = req.body;
  const { id } = req.params;
  let msg;
  // try {
  //   const valueFoods = { namamakan, daerah, deskripsi };
  //   const updateFoods = foodsModel.update(valueFoods, { where: { id } });
  //   await updateFoods;
  //   res.send('Success update');
  // } catch (error) {
  //   console.error(error.message);
  //   res.status(500).send('gagal');
  // }

  foodsModel.findByPk(id).then((emp) => {
    if (emp) {
      emp.update(namamakan, daerah, deskripsi);
      msg = emp;
    } else {
      msg = `id => ${id} not found in db`;
      res.json({ message: msg });
    }
  }).catch((err) => {
    res.json({ msg: err.message() });
  });
};

const deleteProductId = async (req, res) => {
  const { id } = req.params;
  let msg;
  foodsModel.findByPk(id).then((row) => {
    if (row) {
      row.destroy();
      msg = 'success deleted';
    } else {
      msg = `id ${id} not found in db`;
    }
    res.json({ message: msg });
  }).catch((err) => {
    res.json({ message: err.message });
  });
};
module.exports = {
  addFoods,
  getAllProducts,
  getProductID,
  updateProductId,
  deleteProductId,
  uploadFoods,
  getProductCondition,
};
