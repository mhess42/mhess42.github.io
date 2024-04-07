const { defineConfig } = require('@vue/cli-service')
const fs = require('fs')

process.env.VUE_APP_CREDITS = fs.readFileSync('credits.txt')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: ''
})
