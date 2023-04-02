import React from "react";


export default function Progress({progress}) {
  return <div>
    {progress>0 && <div className='progress'>Converting : {progress}%</div>}
  </div>;
}
