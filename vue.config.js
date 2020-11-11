const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const IS_PROD = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: process.env.VUE_APP_OUTPUT_DIR,

  productionSourceMap: false,

  devServer: {
    host: '0.0.0.0',
    proxy: {
      [process.env.VUE_APP_REQUEST_BASE_URL]: {
        target: process.env.VUE_APP_BASE_API,
        changeOrigin: true,
      },
    },
  },

  css: {
    loaderOptions: {
      less: {
        lessOptions: {
          modifyVars: {
            'primary-color': '#6485ff',
            'success-color': '#57df9c',
            'warning-color': '#fdac41',
            'error-color': '#ff5b5c',
            'info-color': '#6485ff',
            'processing-color': '#6485ff',
            'text-color': '#475f7b',
            'font-size-base': '15px',
            'border-radius-base': '6px',
            'btn-border-radius-base': '4px',
            'btn-border-radius-sm': '4px',
            'font-family': '-apple-system, Rubik, \'PingFang SC\', \'Microsoft YaHei\', \'Helvetica Neue\', Helvetica, Arial, sans-serif, \'Apple Color Emoji\', \'Segoe UI Emoji\', \'Segoe UI Symbol\'',
          },
          javascriptEnabled: true,
        },
      },
      scss: { additionalData: '@import "@/assets/scss/variables.scss";' },
      postcss: {
        plugins: [
          require('tailwindcss')('./tailwind.config.js'),
        ],
      },
    },
  },

  chainWebpack: (config) => {
    config.resolve.alias
      .set('@img', '@/assets/images')
      .set('@comp', '@/components')

    config
      .plugin('html')
      .tap((args) => {
        args[0].title = process.env.VUE_APP_PAGE_TITLE
        return args
      })
  },

  configureWebpack: (config) => {
    config.plugins.push(
      new AntdDayjsWebpackPlugin({
        preset: 'antdv3',
      }),
    )
    config.optimization = {
      splitChunks: {
        chunks: 'all',
      },
    }

    if (IS_PROD) {
      config.plugins.push(
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css/,
          threshold: 8192,
        }),
      )
    }
  },
}
