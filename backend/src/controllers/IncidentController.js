const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    //Para iniciar com a primeira pagina
    const { page = 1 } = request.query;

    //[count] == count[0] pega apenas a primeira posição
    const [count] = await connection('incidents').count();

    const incidents = await connection('incidents')
      //Relacionar dados de 2 tabelas ( ongs = tabela, ong_id = campo, tem que ser igual a ong_id)
      .join('ongs', 'ong_id', '=', 'incidents.ong_id')
      //Limitando de 5 em 5 itens
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ]);
    //Mostrar no Header o total de casos
    response.header('X-Total-Count', count['count(*)']);

    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      title,
      description,
      value,
      ong_id,
    });
    return response.json({ id });
  },
  async delete(request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }
    await connection('incidents').where('id', id).delete();

    return response.status(204).send();
  }
};
