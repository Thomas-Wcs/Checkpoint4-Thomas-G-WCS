/* eslint-disable camelcase */
const path = require("path");
const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.adverts
    .findAll()
    .then(([rows]) => {
      res.send(rows);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const read = (req, res) => {
  models.adverts
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const edit = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { pictures, text, lienArticle } = req.body;

  try {
    models.adverts
      .update({
        pictures,
        text,
        lienArticle,
        id,
      })
      .then((response) => {
        if (response.affectedRows === 1) {
          res.sendStatus(204);
        }
      });
    return true;
  } catch (err) {
    return res.status(500).send(err);
  }
};

const add = async (req, res) => {
  const { pictures, text, lienArticle } = req.body;
  const { file } = req;
  if (!file) {
    return res.status(500).send("Le fichier a upload est manquant");
  }
  const baseFolder = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    "images",
    "ads"
  );
  const originalName = path.join(baseFolder, file.originalname);
  const filename = path.join(baseFolder, file.filename);

  fs.rename(filename, originalName, (err) => {
    if (err) res.status(500);
  });
  const picture_link = `assets/images/ads/${file.originalname}`;

  // TODO validations (length, format...)
  try {
    const result = await models.adverts.insert({
      pictures,
      picture_link,
      text,
      lienArticle,
    });

    const newAdvert = {
      pictures,
      picture_link,
      text,
      lienArticle,
      id: result,
    };
    return res.status(201).json(newAdvert);
  } catch (err) {
    return res.status(500).send(err);
  }
};

const destroy = (req, res) => {
  models.adverts
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};
