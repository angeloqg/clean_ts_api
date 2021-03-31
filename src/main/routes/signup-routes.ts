export default (router): void => {
  router.post('/signup', (res, req) => {
    res.json({ ok: 'ok' })
  })
}
