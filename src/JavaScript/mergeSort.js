'use strict'

function mergeSort(arr) {
  if(arr.length < 2) return arr;
  let splitIdx = arr.length/2;
  return merge(mergeSort(arr.slice(0,splitIdx)), mergeSort(arr.slice(splitIdx)));
}

function merge(arr1, arr2){
  let result = [];
  while(arr1.length > 0 && arr2.length > 0){
    if (arr1[0]>arr2[0]) {
      result.push(arr2.shift());
    } else if (arr1[0]<arr2[0]) {
      result.push(arr1.shift())
    }
  }
  return result.concat(arr1).concat(arr2)
}
