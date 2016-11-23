require_relative "heap"

class Array
  def heap_sort!
    (1..self.count).to_a.each do |idx|
      BinaryMinHeap.heapify_up(self, idx, self.length)
    end

    (self.count).downto(1).each do |idx|
      self[0], self[idx - 1] = self[idx - 1], self[0]
      BinaryMinHeap.heapify_down(self, 0, idx - 1)
    end
    self.reverse!
  end
end
