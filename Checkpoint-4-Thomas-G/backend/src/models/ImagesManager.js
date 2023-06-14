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
      `SELECT images.*, categorie.name
      FROM images
      INNER JOIN categorie ON images.category_id = categorie.id
      where ${this.table}.id = ?`,
      [id]
    );
  }

  insert(videos) {
    return this.database
      .query(
        `insert into ${this.table} (title, link, category_id, description_text, date_publication, isVideoPremium, isVideoPaying) values (?, ?, ?, ?, ?, ?, ?)`,
        [
          videos.title,
          videos.link,
          videos.category_id,
          videos.description_text,
          videos.date_publication,
          videos.isVideoPremium,
          videos.isVideoPaying,
        ]
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
      .query("delete from video_section where video_id= ?", [id])
      .then(() => {
        return this.database.query(`delete from ${this.table} where id = ?`, [
          id,
        ]);
      });
  }
}

module.exports = VideoManager;
