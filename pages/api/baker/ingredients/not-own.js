import db from '../../../../database'

export default async (req, res) => {
  try {
    const ingredients = await db.instance.any(
      `select getNotOwnIngredients('${req.query.bakerid}')`
    )
    res.statusCode = 200
    res.json(ingredients.map((ingredient) => ingredient.getnotowningredients))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
