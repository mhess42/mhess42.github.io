const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

process.env.VUE_APP_CREDITS = fs.readFileSync('credits.txt')
process.env.VUE_APP_HOMECARDS = fs.readFileSync('homecards.json')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: ''
})
