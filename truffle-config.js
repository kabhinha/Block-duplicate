module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "5777" // Match any network id
    }
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
        exclude: /node_modules\/(?!(web3)\/).*/,
      },
    ],
  }
}