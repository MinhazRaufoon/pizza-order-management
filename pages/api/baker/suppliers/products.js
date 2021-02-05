import db from '../../../../database'

export default async (req, res) => {
  try {
    const data = await db.any(
      `select getSupplierProducts('${req.query.supplierId}')`
    )
    res.statusCode = 200
    res.json(Object.values(data).map((item) => item.getsupplierproducts))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
