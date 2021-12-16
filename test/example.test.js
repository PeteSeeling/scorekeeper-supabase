// IMPORT MODULES under test here:
// import { example } from '../example.js';

import { renderGame } from '../render-utils';

const test = QUnit.test;

test('expect team name and score to return', (expect) => {
    //Arrange
    // Set up your arguments and expectations
    const expected = 
    
    //Act 
    // Call the function you're testing and set the result to a const
    renderGame();
    const actual = true;

    //Expect
    // Make assertions about what is expected versus the actual result
    expect.equal(actual, expected);
});
