const Produto = require('../models/Produto'); // Verifique se o caminho do arquivo está correto
const Categoria = require('../models/categoria'); // Importando o modelo Categoria

exports.createProduto = async (req, res) => {
  const { produto_nome, categoria_id } = req.body;

  try {
    // Verificar se a categoria existe
    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoria não encontrada' });
    }

    // Criar o produto
    const produto = await Produto.create({ produto_nome, categoria_id });
    res.status(201).json(produto); // Retorna o produto criado com status 201
  } catch (err) {
    console.error(err); // Log do erro para facilitar a depuração
    res.status(500).json({ error: 'Erro ao criar produto' });
  }
};