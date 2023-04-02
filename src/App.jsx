import React, { useState, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import Progress from './Progress'
const ffmpeg = createFFmpeg({ log: true })

function App() {
  const [ready, setReady] = useState(false)
  const [video, setVideo] = useState()
  const [gif, setGif] = useState()
  const [progress, setProgress] = useState(0)

  const load = async () => {
    await ffmpeg.load()
    setReady(true)
  }

  useEffect(() => {
    load()
  }, [])

  async function convertToGif(){
    //Write the File in memory as test.mp4 fetched form user
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))

    //progres logging
   /* ffmpeg.setProgress(({ ratio }) => {
      setProgress((ratio * 100.0).toFixed(2))
      
    });*/
  
    //run ffmpeg commands
    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif')
    setProgress(100);

    //read file
    const data = ffmpeg.FS('readFile', 'out.gif')

    //create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], {type:'image/gif'}))
    setGif(url)

  }






  return ready ? (
    <div className='app'>
      <h1>Edit Mate</h1>
      <p>Convert video into GIF</p>
      
      <div>
      {video && (
        <video
          controls
          width="350"
          src={URL.createObjectURL(video)}
        ></video>
      )}</div>
      <br/>
    
      <input type="file" onChange={(e) => setVideo(e.target.files?.item(0))} />

    
   
      
      <button onClick={convertToGif}>Convert to GIF</button>
       
      
      
      {gif && <div> <p>Here's Your GIF, Right Click and Save!</p> <img src={gif} width="350" /> </div> }
      
      <br/>
     
    </div>
  ) : (
    <p>Loading...</p>
  );
}

export default App
