class QuickSort
  # Quick sort has average case time complexity O(nlogn), but worst
  # case O(n**2).

  # Not in-place. Uses O(n) memory.
  def self.sort1(array)
    return array if array.length < 1
    pivot = array[0]
    left = []
    mid = []
    right = []
    array.each do |num|
      if num < pivot
        left.push(num)
      elsif num > pivot
        right.push(num)
      else
        mid.push(num)
      end
    end
    sort1(left) + mid + sort1(right)
  end

  # In-place.
  def self.sort2!(array, start = 0, length = array.length, &prc)
    return array if length < 2
    split_at = QuickSort.partition(array, start, length, &prc)
    QuickSort.sort2!(array, start, split_at - start, &prc)
    QuickSort.sort2!(array, split_at+1, length - (split_at - start + 1), &prc)
    array

  end

  def self.partition(array, start, length, &prc)
    prc ||= Proc.new{|a, b| a<=>b}
    pivot_idx = start
    (start+1).upto(length + start - 1) do |idx|
      pivot = array[pivot_idx]
      num = array[idx]
      if prc.call(pivot, num) == 1
        array[idx], array[pivot_idx + 1] = array[pivot_idx + 1], array[idx]
        array[pivot_idx], array[pivot_idx + 1] = array[pivot_idx + 1], array[pivot_idx]
        pivot_idx += 1
      end
    end
    pivot_idx
  end
end
