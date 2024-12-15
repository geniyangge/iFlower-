const { defineConfig } = require('@vue/cli-service');
module.exports = defineConfig({
  transpileDependencies: true,
  // 全局scss配置
  css: {
    loaderOptions: {
      sass: {
        // 配置全局scss
        additionalData: `@import "~@/assets/styles/scss/global.scss";`,
      },
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "@/assets/styles/less/vant.less";`,
          },
        },
      },
    },
  },
  // 配置proxy代理服务，用于跨域请求
  devServer: {
    proxy: {
      '/': {
        target: 'http://118.25.103.236:9000/api',
        changeOrigin: true,
        ws: false,
      },
    },
  },
});
