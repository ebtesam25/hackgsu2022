import React, { Component, createRef, useState } from 'react'
import Chart from 'react-google-charts'

export default function Lesson3() {
    var dictionary = [
        ['today is a sunny day'],
        ['today is sunday'],
        ['today is my birthday'],
        ['today is the last day of spring break'],
      ]
      const WordTreeOptions = {
        wordtree: {
          format: 'implicit',
          word: 'today',
        },
      }
      const _addtodict = (x) =>{
          console.log(x)
          setviewdict([...viewdict,[x]]);
          console.log(viewdict)
      
      }

    let word = createRef();
      
    const [viewdict, setviewdict] = useState(dictionary)
    return (
      <div className="px-20">
          <div className="font-bold">Dictionary</div>
          <input type="text" ref={word} placeholder="Add a phrase" class="input input-bordered w-full max-w-xs"></input>
          <button onClick={()=>_addtodict(word.current.value)} class="btn btn-wide">Add to dictionary</button>
          {viewdict.map((phrase)=>(<div className="text-lg">{phrase.toString()}</div>))}
          <div className="font-bold">Tree</div>
        <Chart
          width={'1000px'}
          height={'600px'}
          chartType="WordTree"
          loader={<div>Loading Chart</div>}
          data={viewdict}
          options={WordTreeOptions}
          rootProps={{ 'data-testid': '1' }}
        />
      </div>
    )
  }
