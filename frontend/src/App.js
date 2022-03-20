import React, { useState } from 'react';

import NavBar from './Navbar';
import Lesson1 from './l1';
import Lesson2 from './l2';
import Lesson3 from './l3';



export default function App() {
  const [index, setIndex] = useState(0);
  return (<div>
    <div class="navbar bg-base-100">
  <div class="flex-1">
    <a class="btn btn-ghost normal-case text-xl">Learnie</a>
  </div>
  <div class="flex-none">
    <ul class="menu menu-horizontal p-0">
      <li><a onClick={()=>setIndex(0)}>Lesson 1</a></li>
      <li><a onClick={()=>setIndex(1)}>Lesson 2</a></li>
      <li><a onClick={()=>setIndex(2)}>Lesson 3</a></li>
    </ul>
  </div>
</div>
    {index==0&&<Lesson1/>}
    {index==1&&<Lesson2/>}
    {index==2&&<Lesson3/>}

  </div>)
}