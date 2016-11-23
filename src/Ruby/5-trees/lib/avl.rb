class AVLTreeNode
  attr_accessor :link, :balance, :value

  def initialize(value)
    @value = value
    @link = [nil, nil]
    @balance = 0
  end
end

class AVLTree
  def initialize
    @root = nil
  end

  def insert(value)
  end
end
