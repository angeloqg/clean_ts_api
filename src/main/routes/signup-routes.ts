export default (router): void => {
  router.post('/signup', (req, res) => {
    res.json({ ok: 'ok' })
  })
}
