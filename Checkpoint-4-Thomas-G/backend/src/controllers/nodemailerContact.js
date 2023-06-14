const nodemailer = require("nodemailer");

function initialize(req, res) {
  const { name, email, message } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_MDP,
    },
  });

  const mailOptions = {
    from: "testwcs004@gmail.com",
    to: "testwcs004@gmail.com", // adresse e-mail du destinataire
    envelope: {
      from: email, // utilisé comme adresse MAIL FROM: pour SMTP
      to: "testwcs004@gmail.com", // utilisé comme adresse RCPT TO: pour SMTP
    },
    subject: "Contact Client",
    text: `Vous avez reçu un message de : ${name}, avec le message suivant : " ${message} "`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else if (info !== null) res.sendStatus(200);
  });
}

function welcomeMessage(req, res) {
  const { name, email } = req.body;
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERVER,
    port: process.env.MAIL_PORT,
    secure: false,
    auth: {
      user: process.env.MAIL_SENDER,
      pass: process.env.MAIL_MDP,
    },
  });

  const mailOptions = {
    from: "testwcs004@gmail.com",
    to: email, // adresse e-mail du destinataire
    envelope: {
      from: "testwcs004@gmail.com", // utilisé comme adresse MAIL FROM: pour SMTP
      to: email, // utilisé comme adresse RCPT TO: pour SMTP
    },
    subject: "Contact Client",
    text: `Merci pour votre inscription : ${name} ! Bienvenue sur Moto'API ! Préparez-vous à vivre une expérience moto sensationnelle.
     Plongez dans un univers captivant rempli de photos de motos à couper le souffle. Que vous soyez un passionné de deux-roues ou simplement curieux, vous trouverez ici votre dose d'adrénaline. Explorez notre galerie diversifiée, découvrez des modèles emblématiques et laissez-vous inspirer par la beauté et la puissance des motos. 
     
     N'hesitez pas à poster une photo de votre belle pour la partager à la communautée ! Accrochez-vous bien et profitez de chaque instant sur Moto'API ! "
     
     Salutations motardes !, 
     `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else if (info !== null) res.sendStatus(200);
  });
}

module.exports = { initialize, welcomeMessage };
