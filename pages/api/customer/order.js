import db from '../../../database'

export default async (req, res) => {
  if (req.method.toLowerCase() !== 'post') {
    res.statusCode = 500
    res.end(req.method)
  }
  try {
    const { customerId, baseSize, ingredientVarietyIds } = JSON.parse(req.body)
    const varietyIdAsPostgresList = JSON.stringify(
      ingredientVarietyIds.join(',')
    )
    const queryString = `select createPizzaOrder('${customerId}', '${baseSize}', ${
      "'{" + varietyIdAsPostgresList + "}'"
    })`
    console.log(queryString)

    const response = await db.any(queryString)
    console.log(response)
    res.statusCode = 200
    res.json({
      success: false,
      error: false,
      reason: false,
    })
  } catch (err) {
    console.error(err)
    res.statusCode = 404
    res.end()
  }
}
