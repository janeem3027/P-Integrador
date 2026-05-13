const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// 🧠 Base de datos simulada
const users = {
  "emj740168@gmail.com": {
    password: "22011001",
    resetToken: null
  }
};

// 📩 CONFIGURACIÓN GMAIL
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "emj740168@gmail.com",
    pass: "neyz kjef tjmg jzvw" // 🔥 CAMBIA SOLO ESTO
  }
});

// 🔐 RECUPERAR CONTRASEÑA
app.post("/recover-password", async (req, res) => {
  const { email } = req.body;

  console.log("📩 Request recibido:", email);

  if (!email) {
    return res.status(400).json({ message: "Correo requerido" });
  }

  if (!users[email]) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  const token = crypto.randomBytes(3).toString("hex");

  users[email].resetToken = token;

  try {
    await transporter.sendMail({
      from: "emj740168@gmail.com",
      to: email,
      subject: "Código de recuperación",
      text: `Tu código es: ${token}`
    });

    console.log("📨 Token enviado:", token);

    res.json({ message: "Correo enviado correctamente" });

  } catch (error) {
    console.log("❌ ERROR GMAIL:", error);
    res.status(500).json({ message: "Error al enviar correo" });
  }
});

// 🔑 RESET PASSWORD
app.post("/reset-password", (req, res) => {
  const { email, token, newPassword } = req.body;

  if (!users[email]) {
    return res.status(404).json({ message: "Usuario no encontrado" });
  }

  if (users[email].resetToken !== token) {
    return res.status(400).json({ message: "Token inválido" });
  }

  users[email].password = newPassword;
  users[email].resetToken = null;

  res.json({ message: "Contraseña actualizada correctamente" });
});

// 🚀 SERVER
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});