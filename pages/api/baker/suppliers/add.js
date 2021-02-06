import db from '../../../../database'

export default async (req, res) => {
  try {
    const { bakerId, supplierId } = JSON.parse(req.body)

    const data = await db.instance.any(
      `select addNewSupplier('${bakerId}', '${supplierId}')`
    )

    res.statusCode = 200
    res.json(Object.values(data).map((item) => item.getuncontractedsuppliers))
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
