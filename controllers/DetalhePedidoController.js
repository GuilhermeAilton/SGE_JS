const DetalhePedido = require('../models/DetalhePedido');

exports.createDetalhePedido = async (req, res) => {
  const { dt_pedido_id, dt_produto_id, dt_valor, dt_desconto } = req.body;

  try {
    const detalhe = await DetalhePedido.create({
      dt_pedido_id,
      dt_produto_id,
      dt_valor,
      dt_desconto,
    });
    res.json(detalhe);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao criar detalhe do pedido' });
  }
};
