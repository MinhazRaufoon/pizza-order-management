import db from '../../../database'

export default async (req, res) => {
  try {
    const data = await db.instance.any(`select getAvailableIngredients()`)
    res.statusCode = 200
    res.json(Object.values(data).map((item) => item.getavailableingredients))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
