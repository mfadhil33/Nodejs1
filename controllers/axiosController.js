const axios = require('axios');

const fetchApi = async (req, res) => {
  try {
    const response = await axios.get('https://reqres.in/api/users?=2');
    console.log(response.data);

    res.status(200).json(({
      Message: 'Data berhasil di tangkap',
      Data: response.data.data,
    }));
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const addData = async (req, res) => {
  try {
    const { name, job } = req.body;
    const response = await axios({
      method: 'post',
      url: 'https://reqres.in/api/users',
      data: {
        name,
        job,
      },
    });
    res.status(200).json({
      data: response.data,
      message: {
        status: 'success',
        success: 'data berhasil dikirim',
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const updateData = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, job } = req.body;
    const response = await axios({
      method: 'put',
      url: `https://reqres.in/api/users/${id}`,
      data: {
        name,
        job,
      },
    });
    res.status(200).json({
      data: {
        name: response.name,
        job: response.job,
      },
      status: 'success',
      message: 'Data berhasil diupdate',
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

const deleteData = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios({
      method: 'delete',
      url: `https://reqres.in/api/users/${id}`,
    });
    res.status(200).json({
      data: response.data.data,
      message: 'data berhasil di hapus',
    });
  } catch (error) {
    res.status(400).send({

      message: 'gagal menghapus',
    });
  }
};

module.exports = {
  fetchApi, addData, updateData, deleteData,
};
