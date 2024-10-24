const Produto = require('../models/Produto');

exports.createProduto = async (req, res) => {
  const { produto_nome } = req.body;

  try {
    const produto = await Produto.create({ produto_nome });
    res.json(produto);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};


