import {
  Typography,
  ListItem,
  Grid,
  List,
  Button
} from '@material-ui/core'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import { makeStyles } from '@material-ui/core/styles'
import * as moment from 'moment'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
  info: {
    color: 'green'
  },
  warning: {
    color: 'red'
  }
}))


const  getTotalOutPut = out => out.reduce((a, b) => a + b.value, 0)

const getFee = row => {
    let totalInput = 0
    if (row.inputs[0].witness === '0000000000000000000000000000000000000000000000000000000000000000') {
        return 0
    }
    for (let input of row.inputs) {
        if (input.prev_out && input.prev_out.value > 0) {
            totalInput += input.prev_out.value
        } 
    }
    const totalOutPut = getTotalOutPut(row.out)
    return  totalInput -totalOutPut
} 



function BlockTransactions (props) {
  const [page, setPage] = useState(0)
  const pageSize = 10
  const classes = useStyles()
  const { data } = props
  if (!data) {
    return null
  }
  const { tx } = data
  const totalPage = Math.ceil(tx.length / pageSize)

  return (
    <>
      <Typography variant='h2' gutterBottom>
        Block Transactions
      </Typography>
      <List component='div' disablePadding>
        {tx.slice(page * pageSize, (page + 1) * pageSize).map(row => (
          <>
            <ListItem component='div' disableGutters key={row.hash}>
              <Grid container spacing={3}>
                <Grid item xs={1}>
                  <p>hash</p>
                </Grid>
                <Grid item xs={4}>
                  <p>{row.hash}</p>
                </Grid>
                <Grid item xs={1} />
                <Grid item xs={4} />
                <Grid item xs={2}>
                  <p>{moment.unix(row.time).format('YYYY-MM-DD HH:mm')}</p>
                </Grid>
              </Grid>
            </ListItem>
            <ListItem component='div' disableGutters key={`${row.hash}tx`}>
              <Grid container spacing={3}>
                <Grid item xs={1} />
                <Grid item xs={4}>
                  {row.inputs.map(input => {
                    if (input.prev_out) {
                      return (
                        <p>{input.prev_out.addr} {(input.prev_out.value / 100000000).toFixed(8)}BTC</p>
                      )
                    } else {
                      return <p className={classes.info}>Newly Generated Coins</p>
                    }
                  })}
                </Grid>
                <Grid item xs={3}>
                  <ArrowForwardIcon />
                </Grid>
                <Grid item xs={4}>
                  {row.out.map(o => {
                    if (o.value > 0) {
                      return (
                        <p> {o.addr} {(o.value / 100000000).toFixed(8)} BTC</p>
                      )
                    } else {
                      return (
                        <p className={classes.warning}>Unable to decode output address</p>
                      )
                    }
                  })}
                </Grid>
              </Grid>
            </ListItem>
            <ListItem component='div' disableGutters key={`${row.hash}fee`}>
              <Grid container spacing={3}>
                <Grid item xs={1}><p>Fee</p></Grid>
                <Grid item xs={4}>
                <p>{(getFee(row)/ 100000000).toFixed(8)} BTC</p>
                  <p>(130.890 sat/B - 65.274 sat/WU - 382 bytes)</p>
                </Grid>
                <Grid item xs={3} />
                <Grid item xs={2} />
                <Grid item xs={2}>
                  <p>
                    {(getTotalOutPut(row.out)/ 100000000).toFixed(8)} BTC
                  </p>
                </Grid>
              </Grid>
            </ListItem>
          </>
        )
        )}
      </List>
      <Grid container spacing={1}>
        {[...Array(totalPage).keys()].map(page => (
          (
            <Grid item xs={1} key={page}>
              <Button onClick={event => {
                setPage(page)
                window.scrollTo(0, 0)
              }}
              >{page + 1}
              </Button>
            </Grid>)
        ))}
      </Grid>
    </>
  )
}
export default BlockTransactions
