const AbstractManager = require("./AbstractManager");

class AdvertsManager extends AbstractManager {
  constructor() {
    super({ table: "adverts" });
  }

  findAll() {
    return this.database.query(`select * from  ${this.table}`);
  }

  insert(adverts) {
    return this.database.query(
      `insert into ${this.table} (pictures, picture_link, text, lienArticle) values (?, ?, ?, ?)`,
      [
        adverts.pictures,
        adverts.picture_link,
        adverts.text,
        adverts.lienArticle,
      ]
    );
  }

  update(adverts) {
    return this.database.query(
      `update ${this.table} set pictures = ?, picture_link = ? text = ? lienArticle = ? where id = ?`,
      [
        adverts.pictures,
        adverts.picture_link,
        adverts.text,
        adverts.lienArticle,
      ]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id= ?`, [id]);
  }
}

module.exports = AdvertsManager;
