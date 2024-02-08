// https://stackoverflow.com/a/19303725/6305204
export const random = ({ seed = 1 }: { seed?: number } = {}) => {
  // produces random floats between 0 and 1.0
  return (): number => {
    const x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };
};
