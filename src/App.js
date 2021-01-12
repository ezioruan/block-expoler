import './App.css'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import BlockExploer from './compoments/BlockExploer'

function App () {
  return (
    <>
      <CssBaseline />
      <Container fixed>
        <Typography component='div' style={{ height: '100vh' }}>
          <BlockExploer />
        </Typography>
      </Container>
    </>
  )
}

export default App
