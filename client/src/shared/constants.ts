export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://super-twitmarks.herokuapp.com"
    : "http://localhost:5500";

export const FOLDERS_PATH = `${BASE_URL}/api/folders`;

export const TWEETS_PATH = `${BASE_URL}/api/tweets`;

export const USERS_PATH = `${BASE_URL}/api/users`;

export const AUTH_PATH = `${BASE_URL}/api/auth`;

export const COLOURS = {
  primary: "#7067CF",
  secondary: "#CBF3D2",
  darkPurple: "#7B287D",
  darkestPurple: "#330C2F",
  lavender: "#B7C0EE",
};
