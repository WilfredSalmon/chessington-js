function testPushing(allowedMoves) {
    allowedMoves.push('a');
}

const otherList = [];
testPushing(otherList);

console.log(otherList)