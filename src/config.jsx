const config = {
  apiPath: "http://localhost:3000",
  headers: () => {
    return {
      headers: {
        Authorization: "Bearer" + localStorage.getItem("lotto_token"),
      },
    };
  },
};

export default config;
