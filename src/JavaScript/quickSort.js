'use strict'

function quickSort1(arr){
  if (arr.length < 2) return arr;
  let pivot = arr[0];
  let left = [];
  let mid = [];
  let right = [];
  let idx = 0;
  while (idx < arr.length){
    let num = arr[idx];
    if (num < pivot) {
      left.push(num);
    } else if (num > pivot) {
      right.push(num);
    } else {
      mid.push(num);
    }
    idx++;
  }
  return quickSort1(left).concat(mid).concat(quickSort1(right))
};

function quickSort2(arr, start, length){
  if (length < 2) return arr;
  let splitIdx = partition(arr, start, length);
  quickSort2(arr, start, (splitIdx - start))
  quickSort2(arr, splitIdx + 1, length - (splitIdx - start + 1))
  return arr
}:

function partition(arr, start, length){
  let pivotIdx = start;
  for (let i = (pivotIdx+1); i < (length+start); i++) {
    let pivot = arr[pivotIdx];
    let num = arr[i];
    if (num < pivot) {
      let holder = arr[pivotIdx+1];
      arr[pivotIdx] = num;
      arr[i] = holder;
      arr[pivotIdx+1] = pivot
      pivotIdx++;
    }
  }
  return pivotIdx;
};
