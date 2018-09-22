const Match = require('./Match');

// for testing purposes
class MockMatch extends Match {
    constructor(docs) {
        super(docs);
        this.objectives.pop();
    }
}

module.exports = MockMatch;