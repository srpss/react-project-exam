import React from 'react'
export default function Catalog({boards}) {

  
  return (
    boards.map(b => <div key={b._id} >{b.originalPoster}</div>)
    
  )
}
