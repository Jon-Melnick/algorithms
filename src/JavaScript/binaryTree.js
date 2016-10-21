'use strict'

let sTNG = {value: 2,
        left: null,
        right: null}
let sTNF = {value: 2,
          left: sTNG,
          right: null}
let sTNE = {value: 1,
          left: null,
          right: null}
let sTND = {value: 1,
          left: null,
          right: null}
let sTNC = {value: 2,
        left: sTNE,
        right: sTNF}
let sTNB = {value: 1,
        left: sTND,
        right: null}
let sTNA = {value: 1,
        left: sTNB,
        right: sTNC}


console.log(binarySingleTree(sTNA))
console.log(bCountSingleSubTrees(sTNA));



function binarySingleTree(root, value){
  if (!value) {
    value = root.value;
  }
  if (!root) {
    return true
  }
  return root.value === value && binarySingleTree(root.left, value) && binarySingleTree(root.right, value)
}

function bCountSingleSubTrees(root){
  if (!root) return 0;
  let nValue = [root.value, 1];
  let children = [root.left, root.right];
  children.forEach(child=>{
    if (child && nValue[1] === 1) {
      if (nValue[0] !== child.value) {
        nValue = [root.value, 0]
      }
    }
  })
  let sum = nValue[1];
  children.forEach(child=>{
    sum += bCountSingleSubTrees(child)
  })
  return sum;
}

function nCountSingleSubTrees(root){
  if (!root) return 0;
  let nValue = [root.value, 1];
  root.children.forEach(child=>{
    if (nValue[1] === 1) {
      if (nValue[0] !== child.value) {
        nValue = [root.value, 0]
      }
    }
  })
  let sum = nValue[1];
  root.children.forEach(child=>{
    sum += countSingleSubTrees(child)
  })
  return sum;
}
