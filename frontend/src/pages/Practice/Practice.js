import Webcam from 'react-webcam';
import {Hands} from '@mediapipe/hands'; 
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';
import {useRef, useEffect, useState} from 'react';
import * as ml5 from "ml5";
import './Practice.css';

function Practice()
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
      console.error(error);
    }
    setPrediction(result);
  }

  const onResults = (results)=>{
    // console.log(results);
    // Draw
    let offset = 20;
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(
      // results.image, 0, 0, canvasRef.current.height, canvasRef.current.height
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
        inputData.push(landmark.z);
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
    <div className="flex flex-col md:flex-row justify-center align-middle h-screen">
      
      {/* Prediction Info */}
      {/* <div className="h-auto inline-block border-8">
        <p>Current Prediction</p>
        {prediction && <p>Letter: {prediction[0].label} <br/> Confidence: {(prediction[0].confidence*100).toFixed(2)}%</p>}
      </div> */}

      {/* Webcam Output */}
      <div className="flex flex-col justify-center text-center gap-1">
        <h2 className="text-2xl">Make the letter with your hand</h2>
        <canvas className="border-8 border-green-module-text border-solid rounded-md" width={640} height={500} ref={canvasRef}/> 
      </div>
      <Webcam ref={webCamRef} />

    </div>
  )
}

export default Practice;