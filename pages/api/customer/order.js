import db from '../../../database'

export default async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    res.statusCode = 500
    res.end(req.method)
  }
  try {
    const {
      customerId,
      baseSize,
      ingredientVarietyIds,
      houseNo,
      postcode,
      city,
      street,
    } = JSON.parse(req.body)

    const varietyIdAsPostgresList =
      'ARRAY[' + ingredientVarietyIds.map((id) => `'${id}'`).join(',') + ']'

    const queryString = `select createPizzaOrder('${customerId}', '${baseSize}', ${varietyIdAsPostgresList}, '${houseNo}', '${postcode}', '${city}', '${street}')`
    console.log(queryString)

    const response = await db.one(queryString)

    res.statusCode = 200
    res.json(response.createpizzaorder)
  } catch (err) {
    console.error(err)
    res.statusCode = 404
    res.end()
  }
}
