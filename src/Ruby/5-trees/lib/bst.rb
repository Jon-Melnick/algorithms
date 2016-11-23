require 'byebug'

class BSTNode
  attr_accessor :left, :right
  attr_reader :value

  def initialize(value)
    @left = nil
    @right = nil
    @value = value
  end
end

class BinarySearchTree
  def initialize
    @root = nil
  end

  def insert(value)
    if @root.nil?
      @root = BSTNode.new(value)
      return
    end

    BinarySearchTree.insert!(@root, value)
  end

  def find(value)
    BinarySearchTree.find!(@root, value)
  end

  def inorder
    BinarySearchTree.inorder!(@root)
  end

  def postorder
    BinarySearchTree.postorder!(@root)
  end

  def preorder
    BinarySearchTree.preorder!(@root)
  end

  def height
    BinarySearchTree.height!(@root)
  end

  def min
    BinarySearchTree.min(@root)
  end

  def max
    BinarySearchTree.max(@root)
  end

  def delete(value)
    BinarySearchTree.delete!(@root, value)
  end

  def self.insert!(node, value)
    return BSTNode.new(value) unless node
    if node.value >= value
      node.left = BinarySearchTree.insert!(node.left, value)
    else
      node.right = BinarySearchTree.insert!(node.right, value)
    end

    node
  end

  def self.find!(node, value)
    return nil if node == nil
    return node if node.value == value
    if value < node.value
      BinarySearchTree.find!(node.left, value)
    else
      BinarySearchTree.find!(node.right, value)
    end
  end

  def self.preorder!(node)
    return [] unless node
    [node.value].concat(BinarySearchTree.preorder!(node.left)).concat(BinarySearchTree.preorder!(node.right))
  end

  def self.inorder!(node)
    return [] unless node
    BinarySearchTree.inorder!(node.left).concat([node.value]).concat(BinarySearchTree.inorder!(node.right))
  end

  def self.postorder!(node)
    return [] unless node
    BinarySearchTree.postorder!(node.left).concat(BinarySearchTree.postorder!(node.right)).concat([node.value])
  end

  def self.height!(node)
    return -1 unless node
    if node.left == nil && node.right == nil
      return 0
    end
    height = 1
    l_height, r_height = 0, 0
    l_height += BinarySearchTree.height!(node.left)
    r_height += BinarySearchTree.height!(node.right)
    return height += l_height > r_height ? l_height : r_height
  end

  def self.max(node)
    return nil unless node
    return node if node.right == nil
    BinarySearchTree.max(node.right)
  end

  def self.min(node)
    return nil unless node
    return node if node.left == nil
    BinarySearchTree.min(node.left)
  end

  def self.delete_min!(node)
    return nil unless node
    return node.right unless node.left
    node.left = BinarySearchTree.delete_min!(node.left)

    node
  end

  def self.delete!(node, value)
    return nil unless node && value
    if node.value > value
      node.left = BinarySearchTree.delete!(node.left, value)
    elsif node.value < value
      node.right = BinarySearchTree.delete!(node.right, value)
    else
     return node.left unless node.right
     return node.right unless node.left
     t = node
     node = t.right.min
     node.right = BinarySearchTree.delete_min!(t.right)
     node.left = t.left
    end
    node
  end

end
