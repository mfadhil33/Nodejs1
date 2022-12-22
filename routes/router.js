const express = require('express');
const { registerUser, login } = require('../controllers/authController');
const {
  addFoods, getAllProducts, getProductID, updateProductId, deleteProductId, uploadFoods,
  getProductCondition,
} = require('../controllers/foodsController');
const { auth } = require('../middleware/verifytoken');
const {
  fetchApi, addData, updateData, deleteData,
} = require('../controllers/axiosController');
const {
  methodGet,
  methodPost,
  methodPut,
  methodDelete,
} = require('../controllers/sampleController');

const router = express.Router();

router.get('/', methodGet);

router.post('/', methodPost);

router.put('/', methodPut);

router.delete('/', methodDelete);

// foods
router.post('/foods', addFoods);
router.get('/foods', auth, getAllProducts);
router.get('/foods/:id', getProductID);
router.put('/foods/:id', updateProductId);
router.delete('/foods/:id', deleteProductId);
router.post('/foods/upload', uploadFoods);
router.post('/foods/search', getProductCondition);

// auth
router.post('/auth/register', registerUser);
router.post('/auth/login', login);

// axios
router.get('/axios/fetch', fetchApi);
router.post('/axios/fetch', addData);
router.put('/axios/fetch', updateData);
router.delete('/axios/fetch/:id', deleteData);

module.exports = router;
