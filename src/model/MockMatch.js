const Match = require('./Match');

class MockMatch extends Match {
    constructor(docs) {
        super(docs);
        this.objectives.pop();
    }
}

module.exports = MockMatch;