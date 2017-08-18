let input = [ "AND", ["<", "var1", "var2"], [ "OR", [">", "var3", "var4"], ["==", "var5", "var6"] ] ]

let priorities = {
  'AND': 0,
  'OR': 1,
  'default': 2
}

function getPriority(op) {
  if ( priorities[op] ) {
    return priorities[op]
  } else {
    return priorities['default']
  }
}

function parsePolishString(input, parentPriority = 0) {
  let result = ""
  let opPriority = getPriority(input[0]) // identify current Operator's priority

  result = parseElement(input, 1, opPriority) + " " + input[0] + " " + parseElement(input, 2, opPriority) // fill out string

  if ( opPriority < parentPriority ) { // writes explicit bracket notation when out of priority ( OR > AND )
    result = "(" + result + ")"
  }

  return result;
}

function parseElement(input, pos, opPriority) {
  if ( Array.isArray(input[pos]) ) {
    return parsePolishString(input[pos], opPriority) // if element is an array, parse recursively
  } else {
    return input[pos] // otherwise, just provide the element string
  }
}

console.log("input:", input)
console.log("output:", parsePolishString(input))