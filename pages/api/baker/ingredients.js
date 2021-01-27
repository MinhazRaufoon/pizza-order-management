import db from '../../../database'

export default async (req, res) => {
  try {
    const data = await db.any(`select getIngredients('666666')`)
    res.statusCode = 200
    res.json(Object.values(data).map((item) => item.getingredients))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
