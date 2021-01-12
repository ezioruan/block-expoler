const axios = require('axios')
const Router = require('@koa/router')
const router = new Router()

const getSingleBlockInfo = blockHash => axios.get(`https://blockchain.info/rawBlock/${blockHash}`)
const getBlockCount = () => axios.get('https://blockchain.info/q/getblockcount')

router.get('/block/:blockHash', async ctx => {
  const { blockHash } = ctx.params
  const blockInfo = await getSingleBlockInfo(blockHash)
  if (blockInfo) {
    const blockCount = await getBlockCount()
    const confirmations = parseInt(blockCount, 10) - blockInfo.height + 1
    blockInfo.confirmations = confirmations
  }
  ctx.body = blockInfo
})

module.exports = router
