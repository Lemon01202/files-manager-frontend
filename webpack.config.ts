const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@constants": path.resolve(__dirname, "src/constants"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@routes": path.resolve(__dirname, "src/routes"),
      "@services": path.resolve(__dirname, "src/services"),
      "@types": path.resolve(__dirname, "src/types"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  }
};
