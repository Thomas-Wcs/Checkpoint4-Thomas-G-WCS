const AbstractManager = require("./AbstractManager");

class VideoManager extends AbstractManager {
  constructor() {
    super({ table: "images" });
  }

  findAll() {
    return this.database.query(
      `SELECT images.*, categorie.name AS categorie_name
      FROM images
      INNER JOIN categorie ON images.category_id = categorie.id;`
    );
  }

  find(id) {
    return this.database.query(
      `SELECT images.*, categorie.name AS categorie_name
      FROM images
      INNER JOIN categorie ON images.category_id = categorie.id
      where ${this.table}.id = ?`,
      [id]
    );
  }

  insert(images) {
    return this.database
      .query(
        `insert into ${this.table} (title, link, category_id, description_text) values (?, ?, ?, ?)`,
        [images.title, images.link, images.category_id, images.description_text]
      )
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
  }

  update(id, videos) {
    return this.database
      .query(`update ${this.table} set  ? where id = ?`, [videos, id])
      .then(([result]) => result.affectedRows === 1)
      .catch((err) => {
        console.error(err);
      });
  }

  delete(id) {
    return this.database
      .query(`delete from ${this.table} where id= ?`, [id])
      .then(([response]) => response);
  }
}

module.exports = VideoManager;
