import db from '../../../database'

export default async (req, res) => {
  try {
    const data = await db.any(`select getAvailableIngredients()`)
    res.statusCode = 200
    res.json({
      success: false,
      error: false,
      reason: false,
    })
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
