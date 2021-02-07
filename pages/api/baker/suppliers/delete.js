import db from '../../../../database'

export default async (req, res) => {
  try {
    const { bakerId, supplierId } = JSON.parse(req.body)

    const response = await db.instance.one(
      `select deleteSupplier('${bakerId}', '${supplierId}')`
    )

    res.statusCode = 200
    res.json(response.deletesupplier)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
