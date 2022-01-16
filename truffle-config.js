require('dotenv').config()
const HDWalletProvider = require('@truffle/hdwallet-provider')
const mnemonic =
  'black humble social live thing wheat fruit wrist february rough clap orphan'
module.exports = {
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
    },
    one: {
      provider: () =>
        new HDWalletProvider(mnemonic, 'https://api.s0.b.hmny.io'),
      network_id: 1666700000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
    mumbai: {
      provider: () =>
        new HDWalletProvider(mnemonic, `https://rpc-mumbai.matic.today`),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://polygon-mumbai.g.alchemy.com/v2/s1b_xfH_dzDOOvbpqtGNEDaMFgvYAu18`,
        ),
      network_id: 80001,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },

    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://eth-rinkeby.gateway.pokt.network/v1/lb/6160934725e5100036210c11`,
        ),
      network_id: 4,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
    },
  },
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      version: '0.6.12',
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
}
