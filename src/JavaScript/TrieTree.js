'use strict'

const Node = function(val){
    this.val = val;
    this.children = {};
}

const Trie = function (){
    this.root = new Node('');
}

Trie.prototype.insert = function(val){
    let root = this.root;
    if (!val) return val;
    let idx = 1;
    while (idx <= val.length){
        let key = val.slice(0,idx);
        if (root.children[key]){

        } else {
            root.children[key] = new Node(key);
        }
        root = root.children[key];
        idx++;
    }
    return root;
}

Trie.prototype.getChildrenLength = function(val){
    let root = this.root;
    if (!val) return 0;
    let idx = 1;
    while (idx <= val.length){
        let key = val.slice(0,idx);
        if (root.children[key]){
            root = root.children[key];
        } else {
            return 0;
        }
        idx ++;
    }
    return this.traverseForValue(root)
}

Trie.prototype.traverseForSum = function (root){
  if (Object.keys(root.children).length < 1) return 1
  let result=0;
  Object.keys(root.children).forEach(child=>{
    result += this.traverseForSum(root.children[child])

  })
  return result;
}

Trie.prototype.traverseForValue = function(root){
  let queue = [root];
  let result = [];
  while (queue.length > 0) {
    let node = queue.shift();
    Object.keys(node.children).forEach(val=>{
      let child = node.children[val];
      queue.push(child);
    })
    if (Object.keys(node.children).length < 1) {
      result.push(node.val);
    }
  }
  return result;
}
