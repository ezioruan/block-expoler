
import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import SearchIcon from '@material-ui/icons/Search'
import BlockTransactions from './BlockTransactions'
import BlockInfo from './BlockInfo'
import CircularProgress from '@material-ui/core/CircularProgress'

const getBlockInfo = hash => window.fetch(`https://blockchain.info/rawblock/${hash}?cors=true`)
const getBlockCount = () => window.fetch('http://blockchain.info/q/getblockcount?cors=true')

const getBlockData = async hash => {
  const resp = await getBlockInfo(hash)
  const data = await resp.json()
  const blockCount = await getBlockCount().then(resp => resp.text())
  const confirmations = parseInt(blockCount, 10) - data.height + 1
  data.confirmations = confirmations
  data.hash = hash
  return data
}

function BlockExploer (props) {
  const [data, setData] = useState(null)
  const [hash, setHash] = useState('00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81ffaa')
  const [loading, setLoading] = useState(false)

  const getData = async () => {
    setLoading(true)
    const data = await getBlockData(hash)
    setData(data)
    setLoading(false)
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs>
          <TextField
            id='blockHash'
            label='blockHash'
            style={{ margin: 8 }}
            placeholder='Placeholder'
            helperText='Bitcoin block Hash'
            fullWidth
            margin='normal'
            InputLabelProps={{
              shrink: true
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <SearchIcon onClick={event => {
                    getData()
                  }}
                  />
                </InputAdornment>
              )
            }}
            onChange={event => {
              setHash(event.target.value)
            }}
            onKeyDown={async event => {
              if (event.keyCode === 13) {
                getData()
              }
            }}
            value={hash}
          />
        </Grid>
      </Grid>
      {loading && (<CircularProgress />)}
      {(!loading && data) && (
        <div id='dataContainer'>
          <BlockInfo id='data' data={data} />
          <BlockTransactions data={data} />
        </div>
      )}
    </>
  )
}
export default BlockExploer
