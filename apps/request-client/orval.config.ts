module.exports = {
  petStore: {
    input: "./openapi.yaml",
    output: {
      target: "./src/shared/api/client.ts",
      client: "react-query",
      override: {
        mutator: {
          path: "./src/shared/api/http.ts",
          name: "http",
        },
      },
    },
  },
};
