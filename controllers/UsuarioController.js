const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); // Confirme se está usando bcryptjs

exports.createUsuario = async (req, res) => {
  const { usuario_login, usuario_senha } = req.body;

  try {
    const hashedSenha = await bcrypt.hash(usuario_senha, 10);
    const usuario = await Usuario.create({ usuario_login, usuario_senha: hashedSenha });

    return res.status(201).json({ message: "Usuário criado com sucesso", usuario });
  } catch (err) {
    console.error(err); // Logar o erro para depuração
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};

exports.login = async (req, res) => {
  const { usuario_login, usuario_senha } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { usuario_login: usuario_login }
    });

    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado" });
    }

    const senhaVerificada = await bcrypt.compare(usuario_senha, usuario.usuario_senha); // Corrigido para usar usuario_senha

    if (!senhaVerificada) {
      return res.status(401).json({ message: "Senha incorreta" });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, {
      expiresIn: 700 
    });

    return res.json({
      auth: true,
      token: token,
      message: "Login feito com sucesso"
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar usuários' });
  }
};

exports.listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    return res.status(200).json(usuarios);    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao consultar usuários' });
  }
};
