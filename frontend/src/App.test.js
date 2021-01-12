import { render,fireEvent, waitFor,wait,screen,queryByAttribute } from '@testing-library/react'
import App from './App'

jest.setTimeout(10000);

test('renders learn react link', async () => {
  const app = render(<App />)
  const input = screen.getByLabelText(/blockHash/i)
    const blockHash = '00000000000000000007878ec04bb2b2e12317804810f4c26033585b3f81f'
    fireEvent.change(input, {
    target: {value: blockHash},
  })
  fireEvent.keyDown(input, { key: 'enter', keyCode: 13 })
   await waitFor(() => {
    expect(screen.getByText('Block Transactions')).toBeInTheDocument()
  })
})
