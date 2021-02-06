import db from '../../../../database'

export default async (req, res) => {
  try {
    const data = await db.any(`select getMyIngredients('666666')`)
    res.statusCode = 200
    res.json(Object.values(data).map((item) => item.getmyingredients))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
