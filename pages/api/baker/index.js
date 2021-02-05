import db from '../../../database'

export default async (req, res) => {
  try {
    const data = await db.one(`select getSummaryOfEverything('666666')`)
    res.statusCode = 200
    res.json(data.getsummaryofeverything)
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
