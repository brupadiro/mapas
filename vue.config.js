const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({

  lintOnSave: false,
  transpileDependencies: [
    'vuetify'
  ],
  filenameHashing: false,
  configureWebpack: {
    module: {
      rules: [
        // ...
        {
          test: /\.svg$/,
          use: [
            'vue-loader',
            'vue-svg-loader',
          ],
        },
      ],
    },
    optimization: {
      splitChunks: false
    }
  }
})
