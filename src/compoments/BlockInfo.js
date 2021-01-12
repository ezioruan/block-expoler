import Typography from '@material-ui/core/Typography'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import * as moment from 'moment'

function BlockInfo (props) {
  const { data } = props
  if (!data) {
    return null
  }
  const rows = [{
    name: 'Hash',
    value: data.hash
  }, {
    name: 'Confirmations',
    value: data.confirmations
  }, {
    name: 'Timestamp',
    value: moment(data.timestamp).format('YYYY-MM-DD HH:mm')
  }, {
    name: 'Height',
    value: data.height
  }, {
    name: 'Address',
    value: data.tx[0].out[0].addr
  }, {
    name: 'Number of Transactions',
    value: data.tx.length
  }, {
    name: 'Merkle root',
    value: data.mrkl_root
  }, {
    name: 'Version',
    value: data.ver
  }, {
    name: 'Bits',
    value: data.bits
  }, {
    name: 'Weight',
    value: ''
  }, {
    name: 'Size',
    value: data.size
  }, {
    name: 'Nonce',
    value: data.nonce
  }, {
    name: 'Transaction Volume',
    value: ''
  }, {
    name: 'Block Reward',
    value: ''
  }, {
    name: 'Fee Reward',
    value: ''
  }]
  return (
    <>
      <Typography variant='h2' gutterBottom>
        Block {data.height}
      </Typography>
      <TableContainer component={Paper}>
        <Table aria-label='simple table'>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default BlockInfo
