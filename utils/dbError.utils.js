const databaseErrors = (error) => {
  if (error?.code === 11000) {
    return [
      {
        message: "Email Already Exists",
        path: "Email",
      },
    ];
  }
  console.log(error);
  if (error.errors) {
    const value = Object?.values(error?.errors);
    console.log(value);
    if (value.length > 0) {
      return value.map(({ properties }) => {
        const { message, path } = properties;
        return {
          message,
          path,
        };
      });
    }
  }
  return error;
};

export default databaseErrors;
