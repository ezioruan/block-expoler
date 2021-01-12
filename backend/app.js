const Koa = require('koa')
const path = require('path')
const serve = require('koa-static')
const mount = require('koa-mount')
const historyApiFallback = require('koa-history-api-fallback')
const app = new Koa()

const router = require('./router')

const port = Number(process.env.BLOCKLET_PORT || 3030)

const srcDir = path.resolve(
  path.join(path.dirname(__dirname))
)
const webDistDir = path.join(srcDir, 'build')

const staticServe = new Koa()
staticServe.use(historyApiFallback())
staticServe.use(serve(webDistDir))

const api = new Koa()
api
  .use(router.routes())
  .use(router.allowedMethods())

app.use(mount('/api/v1', api))
app.use(mount('/', staticServe))

console.log(`backend run on ${port}`)
app.listen(port)
