import db from '../../../database'

export default async (req, res) => {
  try {
    const data = await db.instance.one(
      `select getSummaryOfEverything('${req.query.bakerid}')`
    )
    res.statusCode = 200
    res.json(data.getsummaryofeverything)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
