const Categoria = require('../models/categoria');

exports.createCategoria = async (req, res) => {
  const { categoria_nome, categoria_id } = req.body;

  try {
    const categoria = await Categoria.create({ categoria_id,categoria_nome });
    res.status(201).json(categoria); // Retorna a categoria criada com status 201
  } catch (err) {
    console.error(err); // Log do erro para facilitar a depuração
    res.status(500).json({ error: 'Erro ao criar categoria' });
  }
};
