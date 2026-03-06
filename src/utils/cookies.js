import cookies from "js-cookies";

export const saveCookie = (key, value) => {
  cookies.setItem(key, value, { expires: 2 / 24 });
};

export const getCookies = (key) => {
  return cookies.getItem(key);
};

export const removeCookies = (key) => {
  cookies.removeItem(key);
};

