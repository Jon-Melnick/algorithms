'use strict'

const Node = function(value){
  this.value = value;
  this.left = null;
  this.right = null;
  this.parent = null;
}


const BinaryTree = function () {
  this.root = null;
}

BinaryTree.prototype.add = function (data) {
  let node = new Node(data);
  if (!this.root) {
    this.root = node;
  } else {
    this.insert(node, this.root);
  }
  return node;
};

BinaryTree.prototype.insert = function (node, root) {
  if (node.value === root.value){

  } else {
    if (node.value < root.value) {
      root.left ? this.insert(node, root.left) : root.left = node;
    } else {
      root.right ? this.insert(node, root.right) : root.right = node;
    }
    if (!node.parent) node.parent = root;
    this.rebalance(root);
  }
};

BinaryTree.prototype.rebalance = function (root) {
  let that = this;
  function balance (node){
    return that.depth(node.left) - that.depth(node.right)
  }

  let rBalance = balance(root);
  if (rBalance > 1){
    if (balance(root.left) < 0){
      this.rotateLeft(root.left);
    }
    this.rotateRight(root);
  } else if (rBalance < -1){
    if (balance(root.right) > 0) {
      this.rotateRight(root.right);
    }
    this.rotateLeft(root);
  }
};

BinaryTree.prototype.depth = function (node) {
  return !node ? 0 : 1 + Math.max(this.depth(node.left), this.depth(node.right));
};

BinaryTree.prototype.rotateRight = function (node) {
  let holder = node.left;
  node.left = holder.right;
  if (holder.right) holder.right.parent = node;
  holder.right = node;
  if (node.parent) {
    node.parent.left && node.parent.left.value === node.value ? node.parent.left = holder : node.parent.right = holder;
    holder.parent = node.parent;
  } else {
    this.root = holder;
    holder.parent = null;
  }
  node.parent = holder;
};

BinaryTree.prototype.rotateLeft = function (node) {
  let holder = node.right;
  node.right = holder.left;
  if (holder.left) holder.left.parent = node;
  holder.left = node;
  if (node.parent) {
    node.parent.left && node.parent.left.value === node.value ? node.parent.left = holder : node.parent.right = holder;
    holder.parent = node.parent;
  } else {
    this.root = holder;
    holder.parent = null;
  }
  node.parent = holder;
};

BinaryTree.prototype.delete = function (val) {
  let node = this.find(val);
  if(!node) return null;
  let bubbleup;
  if(node.left || node.right){
    let replacement = node.left ? this.findMax(node.left) : this.findMin(node.right);
    bubbleup = replacement.parent === node ? replacement : replacement.parent;
    replacement.parent.right === replacement ? replacement.parent.right = replacement.left : replacement.parent.left = replacement.right;
    replacement.left = node.left;
    replacement.right = node.right;
    node.left.parent = replacement;
    node.right.parent = replacement;
    if(node.parent){
      node.parent.left === node ? node.parent.left = replacement : node.parent.right = replacement;
    } else {
      this.root = replacement;
    }
  } else {
    if (node.parent){
      bubbleup = node.parent;
      node.parent.left === node ? node.parent.left = null : node.parent.right = null;
    } else {
      this.root = node.parent;
    }
  }

  this.rebalanceUp(bubbleup);
};

BinaryTree.prototype.rebalanceUp = function (start) {
  let node = start;
  while (node) {
    this.rebalance(node);
    node = node.parent;
  }
};

BinaryTree.prototype.find = function (val) {
  if(!val){return null;}
  let node = this.root;
  while (node && val !== node.value) {
    if (val > node.value ) {
      node = node.right;
    } else if (val < node.value) {
      node = node.left;
    }
  }
  console.log(node);
  return node;
};




let bTree = new BinaryTree();
bTree.add(1);
bTree.add(2);
bTree.add(3);
bTree.add(4);
bTree.add(5);
bTree.add(6);
bTree.add(7);


function countNodes(root){
  return !root ? 0 : 1 + countNodes(root.left) + countNodes(root.right)
}

function inOrder(root) {
  if (!root) return [];
  let left = inOrder(root.left);
  let right = inOrder(root.right);
  return left.concat([root.value]).concat(right)
}

function bfs(root, callback){
  if (!callback) callback = (node)=>{console.log(node.value);}
  let queue = [];
  queue.push(root);
  while (queue.length > 0){
    let node = queue.shift();
    node.left && queue.push(node.left)
    node.right && queue.push(node.right)
    callback(node);
  }
}

function dfs(root, callback){
  if (!callback) callback = (node)=>{console.log(node.value);}
  if(!root) return null;
  dfs(root.left);
  dfs(root.right);
  callback(root)
}
console.log(bTree.delete(5))
console.log(inOrder(bTree.root))
