const storage = typeof window != "undefined" ? window.localStorage : null;

const preStr = 'fI12Cus';

export const set = (item, payload) => {
  if (!storage) return;
  storage.setItem(`${preStr}.${item}`, JSON.stringify(payload));
  return payload;
};

export const get = (item) => {
  if (!storage) return;
  const string = storage.getItem(`${preStr}.${item}`);
  if (string === 'undefined' || string === '') {
    return {};
  }
  return JSON.parse(string);
};

export const remove = (item) => {
  if (!storage) return;
  return storage.removeItem(`${preStr}.${item}`)
};

export const clear = () => {
  if (!storage) return;
  return storage.clear()
};
