let accessToken: string | null = null;

export const getAccessToken = () => accessToken;

export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// export const getRefreshToken = () => {
//   if (typeof window === "undefined") return null;
//   return localStorage.getItem("refresh_token");
// };

// export const setRefreshToken = (token: string) => {
//   localStorage.setItem("refresh_token", token);
// };

export const clearTokens = () => {
  accessToken = null;
  // localStorage.removeItem("refresh_token");
};
