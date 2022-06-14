function generateToken(tokenLength) {
  var numberChars = "0123456789";
  var upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  var lowerChars = "abcdefghijklmnopqrstuvwxyz";
  var allChars = numberChars + upperChars + lowerChars;
  var randtokenArray = Array(tokenLength);
  randtokenArray[0] = numberChars;
  randtokenArray[1] = upperChars;
  randtokenArray[2] = lowerChars;
  randtokenArray = randtokenArray.fill(allChars, 3);
  return shuffleArray(randtokenArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}


module.exports.genToken = generateToken;