const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware para parsear o corpo das requisições
app.use(bodyParser.json());

// Configurar o transporte de email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Rota para receber dados do formulário
app.post("/enviar", (req, res) => {
  const { email } = req.body;
  console.log("Dados recebidos:", req.body);

  // Configurar email para o destinatário
  const mailOptions = {
    from: "seu-email@gmail.com",
    to: "info@christianitatis.org",
    subject: "Nova mensagem do formulário de contato",
    text: `Você recebeu uma nova mensagem de ${email}.`,
  };

  // Configurar email para o remetente
  const mailOptionsCopy = {
    from: "seu-email@gmail.com",
    to: email,
    subject: "Confirmação de recebimento",
    text: "Recebemos sua mensagem e alguém da nossa equipe entrará em contato em breve.",
  };

  // Enviar email para o destinatário
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Erro ao enviar email:", error);
      return res.status(500).send("Erro ao enviar email");
    }
    console.log("Email enviado:", info.response);

    // Enviar cópia para o remetente
    transporter.sendMail(mailOptionsCopy, (error, info) => {
      if (error) {
        console.error("Erro ao enviar cópia:", error);
        return res.status(500).send("Erro ao enviar cópia");
      }
      console.log("Cópia enviada:", info.response);
      res.status(200).send("Emails enviados com sucesso!");
    });
  });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
