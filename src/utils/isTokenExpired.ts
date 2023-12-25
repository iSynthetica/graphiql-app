export const isTokenExpired = (token: string) => {
  const expiry = JSON.parse(atob(token.split('.')[1])).exp;
  const now = Math.floor(new Date().getTime() / 1000);
  console.log('expiry', expiry);
  console.log('now', now);
  console.log('now - expiry', now - expiry);
  return now >= expiry;
};
