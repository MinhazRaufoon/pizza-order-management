import db from '../../database'

export default async (req, res) => {
  try {
    const data = await db.any('select getSuppliers()')
    res.statusCode = 200
    res.json(data)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
