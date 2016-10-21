
def isPattern(str, pattern, matches)
  p matches
  if pattern.length == 1
    p pattern
    if matches[pattern].nil? || matches[pattern] == str
      matches[pattern] = str
      return true
    end
    return false
  end

  maxMatchLen = str.length - pattern.length + 1
  p maxMatchLen
  (0..maxMatchLen).each do |i|
    proposedMatch = str[0..i]
    if matches[pattern[0]] && matches[pattern[0]] != proposedMatch

    end
    matches[pattern[0]] = proposedMatch
    ret = isPattern(str[i+1..-1], pattern[1..-1], matches)
    p ret
    if ret == true
      return true
    end
    if matches[pattern[0]]
      matches.delete(pattern[0])
    end
  end
  return false
end


p isPattern('redblueredblue', 'aaba', {})

# def isPattern(mystr, pattern, matches):
# 	if len(pattern) == 1:
# 		if pattern not in matches or matches[pattern] == mystr:
# 			matches[pattern] = mystr
# 			return True
# 		return False
#
# 	maxMatchLen = len(mystr) - len(pattern) + 1
# 	for i in range(1,maxMatchLen+1):
# 		proposedMatch = mystr[:i]
# 		if pattern[0] in matches and matches[pattern[0]] != proposedMatch:
# 			continue
# 		matches[pattern[0]] = proposedMatch
# 		ret = isPattern(mystr[i:], pattern[1:], matches)
# 		if ret == True:
# 			return True
# 		if pattern[0] in matches:
# 			del matches[pattern[0]]
# 	return False
#
# def main():
# 	mystr = 'redblueredblue'
# 	pattern = 'abab'
# 	print("%s - %s - %s"%(mystr, pattern, isPattern(mystr, pattern, {})))
#
# main()
