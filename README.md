## Install on my ABT Node

[![Install on my ABT Node](https://raw.githubusercontent.com/blocklet/development-guide/main/assets/install_on_abtnode.svg)](https://install.arcblock.io/?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fezioruan%2Fblock-expoler%2Freleases%2Fdownload%2F0.1.0%2Fblocklet.json)

# Block Expoler
a bitcoin block exploer build by react


## Install on my ABT Node

[![Install on my ABT Node](https://raw.githubusercontent.com/blocklet/development-guide/main/assets/install_on_abtnode.svg)](https%3A%2F%2Finstall.arcblock.io%2F%3Faction%3Dblocklet-install%26meta_url%3Dhttps%3A%2F%2Fgithub.com%2Fezioruan%2Fblock-expoler%2Freleases%2Fdownload%2F0.1.0%2Fblocklet.json)




A bitcoin block view build by react 

## frontend 
- setup by create-react-app
- use new code style hock functions
- use material-ui
- display bitcoin block data (some fields are not returned from the API, I left blank there)
- transaction pagination (the API does not return fee's descrption, just hardcode there *****  174.312 sat/B - 79.516 sat/WU - 536 bytes *******)


### dev
```
npm run dev
```
### build
```
npm run build
```

### run test (uncomplete)
 
the test will find the text input, and then put a block hash, wait for the data loading and then check if the block data is matched the input







### backend (experiment with koa js and in process)
since the block info api not returning all the information, I set up this server to combine all the api
the purpose of building this backend is to build the following api
GET `rawBlock/:block`  , return basic block data,  use anyway, and combine result all-in-one object
for example,  to calculate the confirmations need the block count from https://blockchain.info/q/getblockcount
the difficulty not return from the api, but can get from the bitcoin-cli
$ bitcoin-cli getblockheader 000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f
{
  ...
  "height": 0,
  ...
  "bits": "1d00ffff",
  "difficulty": 1,
  ...
}

also, the backend can server the frontend's build directory as an dapp.






