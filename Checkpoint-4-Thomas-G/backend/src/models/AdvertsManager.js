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
    console.log(adverts);
    return this.database.query(
      `update ${this.table} set pictures = ?, text = ?, lienArticle = ? where id = ?`,
      [adverts.pictures, adverts.text, adverts.lienArticle, adverts.id]
    );
  }

  delete(id) {
    return this.database.query(`delete from ${this.table} where id= ?`, [id]);
  }
}

module.exports = AdvertsManager;
