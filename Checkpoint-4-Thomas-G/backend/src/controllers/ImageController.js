/* eslint-disable camelcase */
const path = require("path");
const fs = require("fs");
const models = require("../models");

const browse = (req, res) => {
  models.images
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
  models.images
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
  const result = await models.images.update(
    parseInt(req.params.id, 10),
    req.body
  );
  if (result) {
    res.sendStatus(204);
  } else res.sendStatus(404);
};

const add = async (req, res) => {
  // eslint-disable-next-line camelcase
  const { title, description_text, category_id, date_publication } = req.body;
  const { file } = req;
  if (!file) {
    console.error(
      "Le fichier a upload dans les images pour la moto est manquant. Veuillez ajouter un fichier svp, merci :)"
    );
    return res.sendStatus(500);
  }
  const baseFolder = path.join(
    __dirname,
    "..",
    "..",
    "public",
    "assets",
    "images"
  );
  const originalName = path.join(baseFolder, file.originalname);
  const filename = path.join(baseFolder, file.filename);

  fs.rename(filename, originalName, (err) => {
    if (err) res.status(500);
  });
  const link = `assets/images/${file.originalname}`;

  // TODO validations (length, format...)
  try {
    const result = await models.images.insert({
      title,
      link,
      category_id,
      description_text,
      date_publication,
    });

    const newVideo = {
      title,
      description_text,
      category_id,
      link,
      date_publication,
      id: result,
    };
    return res.status(201).json(newVideo);
  } catch (error) {
    return res.status(500).send(error);
  }
};

const destroy = async (req, res) => {
  await models.images
    .delete(req.params.id)
    .then((response) => {
      if (response.affectedRows === 0) {
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
