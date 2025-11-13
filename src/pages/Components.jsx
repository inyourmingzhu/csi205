import RadixCounter from '../components/Radixcounter'
import Value from '../components/Value'
import Adder from '../components/Adder'
import Timer from '../components/Timer'
import Temperator from '../components/Temperator'

import { useState } from 'react'


function Components() {

  const [counter,setCounter] = useState(0)

  return (

        <div style={{ backgroundColor: '#F5F5DC' }} >
            
            <h1 className="d-flex justify-content-center p-3 fw-bold" >Components</h1>

            <div>
                <RadixCounter/>
        
                <Value name={'counter'} value={counter} setValue={setCounter}/>
        
                <Adder/>
        
                <Timer/>

                <Temperator/>
        
                <p className='text-center mt-3'>67176203 ภทรพร แซ่ลี้</p>
            </div>
            
        </div>

  )
}

export default Components