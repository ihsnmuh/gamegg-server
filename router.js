const express = require('express');
const { ObjectId } = require('mongodb');
const User = require('./User');
const router = express.Router();
// const connection = require('./connection');
require('./mongoose');

router.get('/', (req, res) => {
  res.send('Hello World!');
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send({ data: users });
  } catch (err) {
    res.send({ message: err.message || 'internal server error' });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ _id: id });
    if (user) {
      res.send({ data: user });
    } else {
      res.send({ message: 'user tidak ditemukan' });
    }
  } catch (err) {
    res.send({ message: err.message || 'internal server error' });
  }
});

router.post('/users', async (req, res) => {
  try {
    const { name, age, status } = req.body;
    const newUser = await User.create({
      name,
      age,
      status,
    });
    res.send({ data: newUser });
  } catch (err) {
    res.send({ message: err.message || 'internal server error' });
  }
});

router.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, status } = req.body;
    const updateUser = await User.updateOne(
      { _id: id },
      {
        name,
        age,
        status,
      },
      { runValidators: true }
    );
    if (updateUser) {
      res.send({ data: updateUser });
    } else {
      res.send({ message: 'user tidak ditemukan' });
    }
  } catch (err) {
    res.send({ message: err.message || 'internal server error' });
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteUser = await User.deleteOne({ _id: id });
    if (deleteUser) {
      res.send({ data: deleteUser });
    } else {
      res.send({ message: 'user tidak ditemukan' });
    }
  } catch (err) {
    res.send({ message: err.message || 'internal server error' });
  }
});

// router.get('/users', async (req, res) => {
//   try {
//     if (connection.connect()) {
//       const db = connection.db('db_latihan');
//       const users = await db.collection('users').find().toArray();
//       res.send({ data: users });
//     } else {
//       res.send({ message: 'database connecting is failed' });
//     }
//   } catch (err) {
//     res.send({ message: err.message || 'internal server error' });
//   }
// });

// router.post('/users', async (req, res) => {
//   try {
//     if (connection.connect()) {
//       const { name, age, status } = req.body;
//       const db = connection.db('db_latihan');
//       const users = await db.collection('users').insertOne({
//         name,
//         age,
//         status,
//       });
//       res.send({ message: 'user has been added' });
//     } else {
//       res.send({ message: 'database connecting is failed' });
//     }
//   } catch (err) {
//     res.send({ message: err.message || 'internal server error' });
//   }
// });

// router.put('/users/:id', async (req, res) => {
//   try {
//     if (connection.connect()) {
//       const { id } = req.params;
//       const { name, age, status } = req.body;
//       const db = connection.db('db_latihan');
//       const users = await db.collection('users').updateOne(
//         { _id: ObjectId(id) },
//         {
//           $set: {
//             name,
//             age,
//             status,
//           },
//         }
//       );
//       if (users.modifiedCount == 1) {
//         res.send({ message: 'user has been updated' });
//       } else {
//         res.send({ message: 'update user failed' });
//       }
//     } else {
//       res.send({ message: 'database connecting is failed' });
//     }
//   } catch (err) {
//     res.send({ message: err.message || 'internal server error' });
//   }
// });

// router.delete('/users/:id', async (req, res) => {
//   try {
//     if (connection.connect()) {
//       const { id } = req.params;
//       const db = connection.db('db_latihan');
//       const users = await db
//         .collection('users')
//         .deleteOne({ _id: ObjectId(id) });

//       res.send({ message: 'user has been deleted' });
//     } else {
//       res.send({ message: 'database connecting is failed' });
//     }
//   } catch (err) {
//     res.send({ message: err.message || 'internal server error' });
//   }
// });

module.exports = router;
