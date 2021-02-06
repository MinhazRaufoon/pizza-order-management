import db from '../../../../database'

export default async (req, res) => {
  try {
    const suppliers = await db.any(
      `select getSuppliersOfIngredientVariety('666666', '${req.query.varietyid}')`
    )
    res.statusCode = 200
    res.json(
      suppliers.map((supplier) => supplier.getsuppliersofingredientvariety)
    )
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}