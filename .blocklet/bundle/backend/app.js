const Koa = require('koa');
const app = new Koa();

const port = Number(process.env.BLOCKLET_PORT || 3030);

app.use(async ctx => {
  ctx.body = 'Hello World';
});

app.listen(port);
