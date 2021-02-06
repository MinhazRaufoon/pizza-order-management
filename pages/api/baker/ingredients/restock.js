import db from '../../../../database'

export default async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    res.statusCode = 500
    res.end(req.method)
  }

  try {
    const { supplierId, amount, varietyId } = JSON.parse(req.body)

    const response = await db.one(
      `select restock('666666', '${supplierId}', '${varietyId}', ${amount})`
    )

    res.statusCode = 200
    res.json(response.restock)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
