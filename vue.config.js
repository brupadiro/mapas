const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  filenameHashing: false,
  configureWebpack: {
    optimization: {
      splitChunks: false
    }
  }
})
