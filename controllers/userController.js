const { render, off } = require('../app');
const pool = require('../database');

exports.view = async (req, res) => {
  try {
    await pool.getConnection((err, con) => {
      if (err) throw err;
      con.query('SELECT * FROM user WHERE status = "active"', (err, users) => {
        con.release();

        if (err) throw err;

        const { removed } = req.query;
        if (!err) res.render('index', { users, removed });
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
            res.render('add-user', { alert: 'User added successfully' });
          }
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getUser = async (req, res) => {
  try {
    await pool.getConnection((err, con) => {
      if (err) throw err;

      con.query('SELECT * FROM user WHERE id = ? AND status = ?', [req.params.id, 'active'], (err, rows) => {
        con.release();

        if (err) throw err;
        if (!err) {
          res.render('view-user', { rows });
        }
      });
    });
  } catch (error) {}
};

exports.getEditUser = async (req, res) => {
  try {
    const { id } = req.params;

    await pool.getConnection((err, con) => {
      if (err) throw err;

      con.query(`SELECT * FROM user WHERE id = "${id}"`, (err, rows) => {
        con.release();
        if (err) throw err;

        const { updated } = req.query;

        res.render('edit-user', { rows, updated });
      });
    });
  } catch (error) {
    console.log(error);
  }
};

exports.editUser = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, comment } = req.body;
    const { id } = req.params;
    await pool.getConnection((err, con) => {
      if (err) throw err;
      con.query(
        `UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comment = ? WHERE id = "${id}"`,
        [first_name, last_name, email, phone, comment],
        (err, rows) => {
          con.release();
          if (err) throw err;
          const editedUser = encodeURIComponent('User successfully updated');
          res.redirect(`/users/edit/${req.params.id}/?updated=${editedUser}`);
        }
      );
    });
  } catch (error) {
    console.log(error);
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.getConnection((err, con) => {
      if (err) throw err;

      con.query(`UPDATE user SET status = ? WHERE id = ?   `, ['removed', id], (err, rows) => {
        con.release();
        if (err) throw err;
        const removedUser = encodeURIComponent('User successfully removed');
        res.redirect(`/?removed=${removedUser}`);
      });
    });
  } catch (error) {
    console.log(error);
  }
};
