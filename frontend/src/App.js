import Webcam from 'react-webcam';
import {Hands} from '@mediapipe/hands'; 
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';
import {useRef, useEffect, useState} from 'react';
import * as ml5 from "ml5";
import './App.css';

function App()
{
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  let canvasCtx;
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
    // Draw
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(
      results.image, 0, 0, canvasRef.current.width, canvasRef.current.height
    );
    if (results.multiHandLandmarks)
    {
      for (const landmarks of results.multiHandLandmarks) {
        draw.drawConnectors(canvasCtx, landmarks, hands.HAND_CONNECTIONS,
          {color: '#00FF00', lineWidth: 5});
        draw.drawLandmarks(canvasCtx, landmarks, {color: '#FF0000', lineWidth: 2});
      }
    }
    canvasCtx.restore();

    // predict
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
    // set up canvas
    canvasCtx = canvasRef.current.getContext('2d');

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
    <canvas width={640} height={500} ref={canvasRef}/> 
    <br/>
    <br/>
    {prediction && <div style={{marginLeft:"50px", fontSize:"100px"}}>Letter: {prediction[0].label} <br/> Confidence: {(prediction[0].confidence*100).toFixed(2)}%</div>}
    <br/>
    <Webcam ref={webCamRef} />
    <br/>

    </div>
  )
}

export default App;