
# given an array of sorted coins of different values, what combination of their values will equal the sum in the least amount of coins...

def coins(coins, sum)
  combinations = Array.new(sum + 1){0}

  coins.each do |coin|
    (sum + 1).times do |idx|
      if coin <= idx
        combinations[idx] = combinations[idx - coin] + 1
      end
    end
  end

  combinations.last
end
