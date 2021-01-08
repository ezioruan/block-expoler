import logo from './logo.svg';
import './App.css';
import React, { FC, useEffect, useRef, useState } from "react";


const getBlockData = hash => fetch(`https://blockchain.info/rawblock/${hash}?cors=true`)

function BlockExploer(props) {

  const [data, setData] = useState(0);
  const [hash, setHash] = useState('0000000000000bae09a7a393a8acded75aa67e46cb81f7acaa5ad94f9eacd103');
  return (
    <div>
        <input type='text' value={hash} onChange={event=>{
            setHash(event.target.value)
        }}/>
        <button text='search' onClick={async()=>{
            const resp = await getBlockData(hash)
            const data = await resp.json()
            setData(data)
        }}>search</button>
      <p>data: {JSON.stringify(data)}.</p>
    </div>
  );
}



function App() {
  return (
    <div className="App">
    <BlockExploer/>
    </div>
  );
}

export default App;
