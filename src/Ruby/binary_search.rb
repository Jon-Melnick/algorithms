def recursive_bsearch(arr, target)
  return -1 if arr.empty?
  mid = arr.length / 2
  return mid if arr[mid] == target

  if target < arr[mid]
    return recursive_bsearch(arr[0...mid], target)
  else
    result = recursive_bsearch(arr[(mid+1)..-1], target)
    return result == -1 ? -1 : result + mid + 1
  end

end


def iterative_bsearch(arr, target)
  return -1 if arr.empty?
  left, right = 0, arr.length - 1

  until left > right
    mid = left + (right - left) / 2
    return mid if arr[mid] == target
    if target < arr[mid]
      right = mid - 1
    else
      left = mid + 1
    end
  end
  return -1
end



def rotated_bsearch(arr, target)
  return -1 if arr.empty?

  mid = arr.length / 2

  return mid if arr[mid] == target

  if arr[0] < arr[mid]
    sorted_arr, unsorted_arr = arr[0...mid], arr[mid+1..-1]
  else
    unsorted_arr, sorted_arr = arr[0...mid], arr[mid+1..-1]
  end

  if  sorted_arr.empty? == false && target.between?(sorted_arr[0], sorted_arr[-1])
    if arr[0] == sorted_arr[0]
      return rotated_bsearch(sorted_arr, target)
    else
      result = rotated_bsearch(sorted_arr, target)
      return result == -1 ? -1 : result + mid + 1
    end
  else
    if arr[0] == unsorted_arr[0]
      return rotated_bsearch(unsorted_arr, target)
    else
      result = rotated_bsearch(unsorted_arr, target)
      return result == -1 ? -1 : result + mid + 1
    end
  end

end
