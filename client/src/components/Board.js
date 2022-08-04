import React from 'react'

export default function Board({board}) {
    return (
        <div key={board._id} className='boardCard'>
            <div  >{board.originalPoster}</div>
            <div  >{board._id}</div>
        </div>
    )
}
