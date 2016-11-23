class Fixnum
  # Fixnum#hash already implemented for you
end

class Array
  def hash
    hash = 0
    self.each_with_index {|el, idx| hash += (el.hash * (idx+1).hash)}
    hash
  end
end

class String
  def hash
    chars = self.chars.map(&:ord)
    chars.hash
  end
end

class Hash
  # This returns 0 because rspec will break if it returns nil
  # Make sure to implement an actual Hash#hash method
  def hash
    to_a.sort.hash
  end
end
