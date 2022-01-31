var pool = require('./bd')

async function getNovedades(){
    var query = 'SELECT * FROM novedades'
    var rows = await pool.query(query)
    return rows
}

module.exports = {getNovedades}