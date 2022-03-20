import React from 'react';

import Crossword from '@jaredreisinger/react-crossword';

export default function Lesson1 () {
    const data = {
        across: {
          1: {
            clue: 'trees',
            answer: 'DECISIONTREE',
            row: 0,
            col: 0,
          },
          3: {
            clue: 'probability, regression, decision tree, classification, clustering, validation, confusion matrix, gradient descent, regularization, kernel            ',
            answer: 'REGULARIZATION',
            row: 3,
            col: 9,
          },
        },
        
        down: {
          2: {
            clue: 'decision tree, classification, clustering, validation, confusion matrix, gradient descent, regularization, kernel            ',
            answer: 'REGRESSION',
            row: 0,
            col: 9,
          },
          4: {
            clue: 'decision tree, classification, clustering, validation, confusion matrix, gradient descent, regularization, kernel            ',
            answer: 'CONFUSIONMATRIX',
            row: 0,
            col: 2,
          },
        
        },
            
      };
    return(
        <div style={{paddingLeft:'5%', paddingRight:'5%'}}>
  <div><div className="text-lg font-bold">Crossword</div>
<p>How familiar are you with AI jargons?</p>
  <div style={{width:'50%'}}>
  <Crossword onAnswerCorrect={()=>window.alert('You got that right!')} data={data} />
  </div></div>
  </div>
    )
}