const shuffle = (arr) => {
  const newArr = arr.slice();
  const swap = (idxA, idxB) => {
    const [a, b] = [newArr[idxA], newArr[idxB]];
    newArr[idxA] = b;
    newArr[idxB] = a;
  };

  for (let i = 0; i < arr.length - 1; i++) {
    const randIdx = Math.floor(i + Math.random() * (arr.length - i));
    swap(i, randIdx);
  }
  return newArr;
};

export default shuffle;
