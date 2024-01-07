export const isTokenExpired = (token: string) => {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  const now = Math.floor(new Date().getTime() / 1000);
  return now >= expiry;
};
