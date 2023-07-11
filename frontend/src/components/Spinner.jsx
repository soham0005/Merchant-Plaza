import React from 'react'

function Spinner() {
  return (
    <div className='fixed inset-0 z-10 bg-black flex items-center justify-center opacity-60'>

    <div className='w-10 h-10 border-4 border-solid border-blue-700 border-t-transparent rounded-full animate-spin'>

    </div>
      
    </div>
  )
}

export default Spinner
