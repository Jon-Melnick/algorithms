class Link
  attr_accessor :key, :val, :next, :prev

  def initialize(key = nil, val = nil)
    @key = key
    @val = val
    @next = nil
    @prev = nil
  end

  def to_s
    "#{@key}: #{@val}"
  end
end

class LinkedList
  include Enumerable

  def initialize
    @head = Link.new
    @tail = Link.new
    @head.next = @tail
    @tail.prev = @head
  end

  def [](i)
    each_with_index { |link, j| return link if i == j }
    nil
  end

  def first
    @head
  end

  def last
    @tail
  end

  def empty?
    self.each { |link| return false if link.key}
  end

  def get(key)
    self.each { |link| return link.val if link.key == key}
  end

  def include?(key)
    self.each {|link| return true if link.key == key}
    return false
  end

  def insert(key, val)
    self.each {|link| return link.val = val if link.key == key}

    new_link = Link.new(key, val)
    @tail.prev.next = new_link
    new_link.prev = @tail.prev
    @tail.prev = new_link
    new_link.next = @tail

  end

  def remove(key)
    self.each do |link|
      if link.key == key
        link.prev.next = link.next
        link.next.prev = link.prev
      end
    end
  end

  def each
    current_link = @head.next
    until current_link == @tail
      yield(current_link)
      current_link = current_link.next
    end
  end

  def to_s
    inject([]) { |acc, link| acc << "[#{link.key}, #{link.val}]" }.join(", ")
  end
end
