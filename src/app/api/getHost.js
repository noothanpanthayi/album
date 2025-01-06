export const getHost = () => {
  let env='';
  if (process.env.NODE_ENV === "development") {
    env=process.env.NEXT_PUBLIC_LOCALHOST;
  } else if (process.env.NODE_ENV === "production") {
    env=process.env.NEXT_PUBLIC_PRODHOST;
  }
  return env;
};
