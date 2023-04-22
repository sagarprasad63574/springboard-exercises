/** product: calculate the product of an array of numbers. */

function product(nums) {
  if (nums.length == 0) return 1; 
  return nums[0] * product(nums.slice(1));
}

/** longest: return the length of the longest word in an array of words. */

function longest(words, index = 0, longestSoFar = 0) {
  if (index === words.length) return longestSoFar; 
  longestSoFar = Math.max(words[index].length, longestSoFar);
  return longest(words, index + 1, longestSoFar); 
}

/** everyOther: return a string with every other letter. */

function everyOther(str, index = 0, newStr = "") {
  if (index >= str.length) return newStr;
  newStr += str[index];
  return everyOther(str, index + 2, newStr);
}

/** isPalindrome: checks whether a string is a palindrome or not. */

function isPalindrome(str, index = 0) {
  let leftIndex = index;
  let rightIndex = str.length - index - 1;
  if (leftIndex  >= rightIndex) return true;
  if (str[leftIndex] !== str[rightIndex]) return false; 
  return isPalindrome(str, index + 1);
}

/** findIndex: return the index of val in arr (or -1 if val is not present). */

function findIndex(arr, val, index = 0) {
    if (index === arr.length) return -1;
    if (arr[index] === val) return index;
    return findIndex(arr, val, index + 1);
}

/** revString: return a copy of a string, but in reverse. */

function revString(str, index = 0, newStr = "") {
  if (newStr.length === str.length) return newStr;
  newStr += str[str.length - 1 - index];
  return revString(str, index + 1, newStr);
}

/** gatherStrings: given an object, return an array of all of the string values. */

function gatherStrings(obj) {
  let arr = [];
  for (let key in obj) {
    if (typeof obj[key] === "string") arr.push(obj[key]);
    if (typeof obj[key] === "object") arr.push(...gatherStrings(obj[key]));
  }
  return arr;
}

/** binarySearch: given a sorted array of numbers, and a value,
 * return the index of that value (or -1 if val is not present). */

function binarySearch(arr, val, left = 0, right = arr.length) {
  if (left > right) {
    return -1; 
  }
  let middle = Math.floor((right + left)/2);
  if (arr[middle] === val) {
    return middle; 
  }
  if (arr[middle] > val) {
    return binarySearch(arr, val, left, middle -1);
  }
  return binarySearch(arr, val, middle + 1, right);
}

module.exports = {
  product,
  longest,
  everyOther,
  isPalindrome,
  findIndex,
  revString,
  gatherStrings,
  binarySearch
};
