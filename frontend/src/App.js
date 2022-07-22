import Webcam from 'react-webcam';
import {Hands} from '@mediapipe/hands'; 
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import {useRef, useEffect, useState} from 'react';
import * as ml5 from "ml5";


function HandTracker(){
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  const [prediction, setPrediction] = useState(null);
  let camera = null;  
  let classifier = null;
  let modelLoaded = null;

  const donePredicting = (error, result) =>
  {
    if (error)
    {
      error.log(error);
    }
    setPrediction(result);
  }

  const onResults = (results)=>{
    // console.log(results);
    const landmarks = results.multiHandLandmarks;
    if (landmarks)
    {
      let inputData = [];
      for (const landmark of landmarks[0])
      {
        inputData.push(landmark.x);
        inputData.push(landmark.y);
      }
      // console.log(inputData);
      if (modelLoaded)
      {
        classifier.classify(inputData, donePredicting);
      }
    }
  }

  const modelDoneLoading = () =>
  {
    console.log("Model done loading!");
    modelLoaded = true;
  }

  useEffect(()=>{
    // load classifier
    const options = {
      task: 'classification'
    }
    classifier = ml5.neuralNetwork(options);
    const modelDetails = {
      model: 'http://localhost:4000/model/model.json',
      metadata: 'http://localhost:4000/model/model_meta.json',
      weights: 'http://localhost:4000/model/model.weights.bin'
    }

    classifier.load(modelDetails, modelDoneLoading);
    // load mediapipe hands
    const hands = new Hands({
      locateFile:(file)=>{
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1626903359/${file}`;
      },
    });

    hands.setOptions({
      maxNumHands: 1,
      minDetectionConfidence: 0.75,
      minTrackingConfidence: 0.7
    });

    hands.onResults(onResults);

    if(typeof webCamRef.current !== 'undefined' && webCamRef.current !== null){
      camera = new cam.Camera(webCamRef.current.video,{
      onFrame: async()=>{
        await hands.send({image:webCamRef.current.video})
      }
      });
      camera.start();
      
    }
  }, []);




  return(
    <div>
    <Webcam ref={webCamRef} />
    <canvas ref={canvasRef}/> 
    {prediction && <div>{prediction[0].label}: {prediction[0].confidence}</div>}
    </div>
  )
}

export default HandTracker;