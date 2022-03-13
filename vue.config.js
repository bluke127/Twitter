module.exports = {
  devServer: {
    overlay: false,
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
        @import "@/assets/styles/variables.scss";
        @import "@/assets/styles/mixin.scss";
        `,
      },
    },
  },
};
