var pool = require('./bd')

async function getNovedades() {
    var query = 'SELECT * FROM novedades'
    var rows = await pool.query(query)
    return rows
}
async function insertNovedad(obj) {
    var query = 'INSERT INTO novedades SET ?'
    var rows = await pool.query(query, [obj])
    return rows
}
async function eliminarNovedadByID(id){
    var query = 'DELETE FROM novedades WHERE id= ?'
    var rows = await pool.query(query,[id])
    return rows
}
async function getNovedadesByID(id){
    var query = 'SELECT * FROM novedades WHERE id= ?'
    var rows = await pool.query(query,[id])
    return rows [0]
}
async function editarNovedadByID(obj,id){
    try {
        var query = 'UPDATE novedades SET ? WHERE id= ?'
        var rows = await pool.query(query,[obj,id])
        return rows
    } catch (error) {
        console.log(error)
        throw error
    }
}
module.exports = { getNovedades, insertNovedad, eliminarNovedadByID, getNovedadesByID,editarNovedadByID }