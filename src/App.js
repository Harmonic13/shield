import './App.css';
import {useEffect, useRef, useState} from 'react';
import * as tf from '@tensorflow/tfjs'

function App() {

  const [isModelLoading, setIsModelLoading] = useState(false)
  const [model, setModel] = useState(null)
  const [imageURL, setImageURL] = useState(null)
  const [results, setResults] = useState()

  let imageRef = useRef()

  const url = {
    //modelURL: 'https://raw.githubusercontent.com/Harmonic13/FSClass/main/src/model/model.json'
  }

  const loadModel = async (url) => {
    setIsModelLoading(true)
    try {
      const model = await tf.loadLayersModel(url.modelURL)
      setModel(model)
      setIsModelLoading(false)

    } catch (error) {
      console.log(error)
      setIsModelLoading(false)
    }
  }

  const uploadImage = (e) => {
    const {files} = e.target
    if (files.length > 0) {
      const Furl = URL.createObjectURL(files[0])
      setImageURL(Furl)
    } else {
      setImageURL(null)
    }
  }

  let nameClass = {
    0: 'The person or the image does not have a face shield',
    1: 'The person or image have a face shield'
  }

  const identify = async () => {
    let tensor = tf.browser.fromPixels(imageRef.current).resizeNearestNeighbor([250, 250]).toFloat().expandDims();
    let predicted = await model.predict(tensor).dataSync()
    
    let result = Array.from(predicted).map((prob, index) => {
      return {
        probability: prob,
        className: nameClass[index]
      };
    }).sort((x, y) => {
      return y.probability - x.probability
    }).slice(0, 1)

    console.log(result);
    setResults(result)
  }

  useEffect(() => {
  tf.ready().then(() => {
    loadModel(url)
  });
  }, [])

  if (isModelLoading) {
    return <h2 className="header">Loading Model...</h2>
  }

  return (
    <div className="App">
      <h1 className="header">Image: Face Identifier</h1>
      <div className="inputHolder">
        <input type="file" accept="image/*" capture="camera" className="uploadInput" onChange={uploadImage}/>
      </div>
      <hr></hr>
      <div className="mainWrapper">
        <div className="mainContent">
          <div className="imageHolder">
          <img src={imageURL} key={imageURL} alt="Upload Preview" crossOrigin="anonymous" ref={imageRef} width={'250px'} height={'250px'} />
          </div>
          <hr></hr> 
          {results && <div className='imageHolder'>
          {results.map((result) => {
                return (
                  <div className='result' key={result.className}>
                        <p className='name'>{result.className}</p>
                        <div></div>
                        <p className='confidence'> Confidence level: {(result.probability * 100).toFixed(2)}%</p>
                        <hr></hr>
                  </div>
                )
              })}
            </div>}
        </div>
        {imageURL && <button className="button" onClick={identify}>Identify Image</button>}
      </div>
    </div>
  );
}

export default App;