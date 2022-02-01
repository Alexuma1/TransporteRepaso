var pool = require('./bd')

async function getNovedades() {
    var query = 'SELECT * FROM novedades'
    var rows = await pool.query(query)
    return rows
}


async function insertNovedad(obj) {
    try {
        var query = 'INSERT INTO novedades SET ?'
        var rows = await pool.query(query,[obj])
        return rows
    } catch (error) {
        console.log(error)
        throw error
    }

}

module.exports = { getNovedades , insertNovedad}