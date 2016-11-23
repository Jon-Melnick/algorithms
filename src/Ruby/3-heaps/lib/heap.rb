class BinaryMinHeap
  def initialize(&prc)
    @store = Array.new()
    @prc = prc
  end

  def count
    @store.length
  end

  def extract
    @store[0], @store[count-1] = @store[count-1], @store[0]
    element = @store.pop
    BinaryMinHeap.heapify_down(@store, 0, count)
    element
  end

  def peek
    @store[0]
  end

  def push(val)
    @store.push(val)
    BinaryMinHeap.heapify_up(@store, (count - 1), count)
  end

  protected
  attr_accessor :prc, :store

  public
  def self.child_indices(len, parent_index)
    child1 = (2*parent_index) + 1
    child2 = (2*parent_index) + 2
    if child2 < len
      return [child1, child2]
    elsif child1 < len
      return [child1]
    else
      return []
    end
  end

  def self.parent_index(child_index)
    raise "root has no parent" if child_index <= 0
    (child_index - 1) / 2
  end

  def self.heapify_down(array, parent_idx, len = array.length, &prc)
    prc ||= Proc.new{ |num1, num2| num1 <=> num2 }
    children = child_indices(len, parent_idx)
    children_val = children.map { |idx| array[idx] }
    parent_val = array[parent_idx]
    if children_val.all? {|child| prc.call(parent_val, child) <= 0}
      return array
    end

    if children.length > 1
      idx = prc.call(children_val[0], children_val[1]) == -1 ? children[0] : children[1]
    else
      idx = children[0]
    end

    array[idx], array[parent_idx] = array[parent_idx], array[idx]
    heapify_down(array, idx, len, &prc)

  end

  def self.heapify_up(array, child_idx, len = array.length, &prc)
    prc ||= Proc.new{ |num1, num2| num1 <=> num2 }
    parent = child_idx > 0 ? parent_index(child_idx) : nil
    if parent && prc.call(array[parent], array[child_idx]) == 1
      array[parent], array[child_idx] = array[child_idx], array[parent]
    else
      return array
    end

    heapify_up(array, parent, len, &prc)
  end

end
