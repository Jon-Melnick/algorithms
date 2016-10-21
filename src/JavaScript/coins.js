'use strict'

function coins(coins, sum){
	let combos = new Array(sum + 1).fill(0);

	for (let x = 0; x < coins.length; x++){
		let coin = coins[x];
		for (let i = 1; i < combos.length; i++){
			if (coin <= i){
				combos[i] = combos[i - coin] + 1
			}
		}
	}
	return combos
}

console.log(coins([1, 2, 5], 10));
