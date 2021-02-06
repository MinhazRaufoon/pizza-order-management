import db from '../../../../database'

export default async (req, res) => {
  try {
    const { bakerId, supplierId } = JSON.parse(req.body)
    const data = await db.instance.one(
      `select hideOrShowSupplier('${bakerId}', '${supplierId}')`
    )
    res.statusCode = 200
    res.json(data)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
