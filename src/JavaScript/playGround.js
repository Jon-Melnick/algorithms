'use strict'

// is it a Binary Search Tree?
let bTree = {root: {value: 6,
			 		   left: {value: 4, left: null, right: null},
			 		   right: {value: 5, left: null, right: null}}
            }

function bTreeIsIt(root){
	if (!root) return true;
	if (biggerThanRoot(root.left, root) || smallerThanRoot(root.right, root)) return false;
	return (bTreeIsIt(root.left) )
}

function biggerThanRoot(left, root){
	if(!left) return false
	return left.value > root.value
}

function smallerThanRoot(right, root){
	if(!right) return false
	return right.value < root.value
}

// console.log(bTreeIsIt(bTree.root))



//caching

function caching(){
  let cache = {};
  let i = 0;
  while (i < 10){
    part2(cache, i)
    i += 1
  }
  console.log(cache)
}

function part2(x, i) {
  x[i] = Math.random() * 10;
  return true
}

function nextBiggestNum(n){
	let nArr = n.toString().split('');
	let idx = nArr.length-1;
	while (idx > 0){
		if (nArr[idx]>nArr[idx-1]) break;
		idx--;
	}

	if (idx === 0) return -1;
	let suf = nArr.splice(idx).sort();
	let t = nArr[nArr.length-1];
	idx = 0;
	while (idx < suf.length){
		if (suf[idx] > t) break;
		idx++
	}
	nArr[nArr.length-1] = suf[idx];
	suf[idx] = t;
	return nArr.concat(suf).join('')
}

function integerPartitions(n){
	let set = new Set();
	let x = 1;
	for (let i = 1; i<=n; i++){
		set.add(i);
	}
	while (x <= n/2) {
		let y = x;
		while (y+x <= n){
				let dif = n - (x+y)
				set.add(x*y);
				dif === 0 ? '' : set.add(x*y*dif)
				y++
		}
		x++
	}
	let arr = Array.from(set).sort((a,b)=>a-b);
	let len = arr.length
	console.log(arr[len-1] - arr[0])
	console.log(arr.reduce((a,b)=>{return a+b})/len)
	console.log(arr.reduce((a,b)=>{return a+b})/2)
}



function intPart(n, cache) {
	cache = cache || [1,2,3,4];
	if (n<=0) return -1;
	if(n<=4)return cache.slice(0, n);
	cache = intPart(n-1, cache).concat(n)
	let idx = 0;
	let set = new Set();
	cache.forEach(el=>set.add(el));
	while (idx < Math.ceil(n/2)){
		// console.log("n = "+n+ "; cache at "+idx+"= "+cache[idx])
		let idx2 = idx;
		while(idx2+idx <= n){
			// console.log("idx2 = "+idx2+ "; cache at "+idx2+"= "+cache[idx2])
			let t = cache[idx]+cache[idx2]
			if(t>n) break;
			if((cache[idx]*cache[idx2])>n){
				set.add(cache[idx]*cache[idx2]);
			}
			let dif = n-t;
			console.log(cache)
			let arr = intPart(dif, cache)
			idx2++
		}
		idx++
	}
	cache = Array.from(set);
	console.log(cache);

	return cache.sort((a,b) => a-b);
}

// console.log(intPart(8))

function part2(n) {
	let partition = partCalc(n, {1: [1], 2: [1, 2], 3: [1, 2, 3], 4: [1, 2, 3, 4]})

	let len = partition.length
	let range = partition[len-1] - partition[0]
	let ave = parseFloat(partition.reduce((a,b)=>{return a+b})/len).toFixed(2)
	let med = !(len%2) ? (partition[len/2] + partition[(len/2)-1])/2 : (partition[Math.floor(len/2)])
	return "Range: " + range + " Average: " + ave + " Median: " + parseFloat(med).toFixed(2)

}

function partCalc(n, cache) {

	if (n<=0) return -1;
	if(n<=4)return cache[n];
	cache[n] = partCalc(n-1, cache).concat(n)
	let idx = 0;
	let set = new Set();
	cache[n].forEach(el=>set.add(el));
	while (idx < Math.ceil(n/2)){
		let idx2 = idx;
		while(idx2+idx <= n){
			let arr = cache[n]
			let t = arr[idx]+arr[idx2]
			let dif = n-t;
			if(t>n) break;
			if((arr[idx]*arr[idx2])>n){
				set.add(arr[idx]*arr[idx2]);
			}
			let arr3 = cache[dif] || []
			arr3.forEach(y=>{
				set.add(y*arr[idx]*arr[idx2])
			})
			idx2++
		}
		idx++
	}
	cache[n] = Array.from(set).sort((a,b)=>a-b);
	return cache[n]

}

function part(n) {
  var arr = prodFun(n).sort(function(a,b){return a-b});
  var range = Math.max.apply(Math, arr)-Math.min.apply(Math, arr);
  var average = arr.reduce(function(a, b){return a+b}, 0)/arr.length;
  var median = (arr.length%2)?(arr[Math.floor(arr.length/2)]):((arr[arr.length/2]+arr[arr.length/2-1])/2);
  return "Range: "+range+" Average: "+average.toFixed(2)+" Median: "+median.toFixed(2)+"";
}

function prodFun(n) {
  var arr = enumFun(n).map(function(v){return v.reduce(function(a, b){return a*b}, 1)})
  return arr.filter(function(v, i, self) {return self.indexOf(v) == i;})
}

var results = [[[1]]];
function enumFun(n) {
  if(results[n]===undefined){
    var arr = [[n]];
    for (let i = 1; i < n; i++) {
      var item = enumFun(n-(n-i));
      for (let j = 0; j < item.length; j++) {
        if(item[j][0] <= n-i){
          var a = [n-i];
          Array.prototype.push.apply(a,item[j]);
          arr.push(a)
        }
      }
    }
    results[n] = arr;
  }
  return results[n];
}

// console.log(part(50))
// console.log(part2(50))

function biggestPrimeFactor(num){
	let i = 2
	let res = false;
	let x;
	while (num/i > 2){
		if (num/i === parseInt(num/i)) {
				x = num/i;
				console.log(i);
				if ((x%3!==0 && x%5!==0) && isPrime(x)){
					res = x;
					break;
				}
		}
		i++
	}
	console.log(res);
}

function primes(n){
	let res = [2, 3];
	if (n<2) return [];
	if (n===2) return [2];
	let i = 2;
	while (i <= n/2){
		if (isPrime(i)){
			res.push(i);
		}
		i++
	}
	console.log(res)
}

function isPrime(i){

	if (i%2===0 || i%3===0 || i <=1) return false;
	let x = 5;
	while (x*x <= i){
		if(i%x===0 || i%(x+2)===0){
			return false;
		}
		x+=6
	}
	return true;
}

// biggestPrimeFactor(600851475143)

function testContinue(n){
	let i = 0;
	while (i < n){
		i++
		if (n%i===0) continue;
		console.log(i);
	}
}

// testContinue(10);

 function sieveOfEratosthenes(limit) {
    var sieve = [];
    var primes = [];
    var k;
    var l;

    sieve[1] = false;

    for (k = 2; k <= limit; k += 1) {
      sieve[k] = true;
    }

    for (k = 2; k * k <= limit; k += 1) {
      if (sieve[k] !== true) {
        continue;
      }

      for (l = k * k; l <= limit; l += k) {
        sieve[l] = false;
      }
    }

    sieve.forEach(function (value, key) {

      if (value) {
        this.push(key);
      }
    }, primes);

    return primes.reduce((a,b)=>a+b);
  };

	// console.log(sieveOfEratosthenes(20))

	function countIslands(grid){
		let count = 0;
		for(let i=0; i<grid.length; i++){
			for(let j=0; j<grid[0].length; j++){

				if(grid[i][j] && isIsland(i,j,grid)){
					console.log([i,j])
					count++;
				}
				grid[i][j] = 0;
			}
		}
		return count;
	}

function isIsland(i, j, grid) {
	return (i+1 === 4 || grid[i+1][j]===0) && (j+1===4 || grid[i][j+1]===0) && (i-1 === -1 || grid[i-1][j]===0) && (j-1===-1 || grid[i][j-1]===0)
}

let gridX = [[0, 1, 0, 0],
						 [0, 1, 1, 0],
					 	 [0, 1, 1, 0],
					   [1, 1, 0, 1]]



	// console.log(countIslands(gridX))
