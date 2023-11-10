// ให้บริการเกี่ยวกับการทำงานต่างๆในโปรเจค

function getCurrentTime() {
    return new Date();
}

function addition(x, y) {
    return x + y;
}

module.exports.getCurrentTime = getCurrentTime;
module.exports.addition = addition;