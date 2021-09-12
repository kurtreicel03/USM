const { render, off } = require('../app');
const pool = require('../database');

exports.view = async (req, res) => {
  try {
    await pool.getConnection((err, con) => {
      if (err) throw err;

      con.query('SELECT * FROM user WHERE status = "active"', (err, users) => {
        con.release();

        if (err) throw err;
        if (!err) res.render('index', { users });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.search = async (req, res) => {
  try {
    await pool.getConnection((err, con) => {
      if (err) throw err;

      const { search } = req.body;

      con.query(
        'SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ?',
        [`%${search}`, `%${search}`],
        (err, users) => {
          con.release();
          if (err) throw err;
          if (!err) res.render('index', { users });
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAddUser = (req, res) => {
  try {
    res.render('add-user');
  } catch (error) {
    console.log(error);
  }
};

exports.createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, comment } = req.body;
    await pool.getConnection((err, con) => {
      if (err) throw err;
      con.query(
        'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ?',
        [first_name, last_name, email, phone, comment],
        (err, user) => {
          con.release();
          if (err) throw err;

          if (!err) {
            res.redirect('/');
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};
