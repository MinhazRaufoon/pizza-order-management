import db from '../../../../database'

export default async (req, res) => {
  try {
    const { getingredientvarietybyid } = await db.one(
      `select getIngredientVarietyById('${req.query.varietyid}')`
    )

    const { getingredientbyvarietyid } = await db.one(
      `select getIngredientByVarietyId('${req.query.varietyid}')`
    )

    res.statusCode = 200
    res.json({
      ...getingredientvarietybyid,
      ...getingredientbyvarietyid,
      id: getingredientvarietybyid.id,
    })
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
