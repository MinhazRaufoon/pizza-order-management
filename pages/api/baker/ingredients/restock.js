import db from '../../../../database'

export default async (req, res) => {
  try {
    res.statusCode = 200
    res.json({
      success: true,
    })
  } catch (err) {
    res.statusCode = 404
    res.end(err)
  }
}
