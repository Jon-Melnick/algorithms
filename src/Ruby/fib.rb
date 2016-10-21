def fib(n)
  return 0 if n < 0
  return n if n < 2
  return fib(n-1) + fib(n-2)
end

def fib2(n, cache = [0, 1])
  return 0 if n < 0
  return cache[n] if n < 2
  cache[n-1] = fib2(n-1, cache)
  return cache[n-1] + cache[n-2]
end

def fib3(n, cache = [0,1])
  cache[n] ||= fib3(n-1, cache) + fib3(n-2, cache)
end

def fib4(n)
  return 0 if n < 0
  return n if n < 2
  a, b = 0, 1
  count = 1
  until count == n
    c = b + a
    b, a = c, b
    count += 1
  end

  b
end
