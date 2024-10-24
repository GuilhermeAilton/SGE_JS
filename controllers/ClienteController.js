const Cliente = require('../models/Cliente');
const jwt = require('jsonwebtoken');

exports.createCliente = async (req, res) => {
  const { cliente_nome, cliente_email } = req.body;

  try {
    const cliente = await Cliente.create({ cliente_nome, cliente_email });
    res.json(cliente);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar cliente' });
  }
};

exports.listarClientes = async (req, res) =>{
    try {
        const clientes = await Cliente.findAll()
        res.status(200).json(clientes)
    } catch (error) {
        res.status(500).json({error: 'Erro ao consultar os clientes'})
    }
}
