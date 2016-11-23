# This class just dumbs down a regular Array to be staticly sized.
class StaticArray
  def initialize(length)
    @store = []
    @length = length
    @start_idx = 0
  end

  # O(1)
  def [](index)
    @store[index]
  end

  # O(1)
  def []=(index, value)
    @store[index] = value
  end

  protected
  attr_accessor :store
end
