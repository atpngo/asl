import Webcam from 'react-webcam';
import {Hands} from '@mediapipe/hands'; 
import * as hands from '@mediapipe/hands';
import * as cam from '@mediapipe/camera_utils';
import * as draw from '@mediapipe/drawing_utils';
import {useRef, useEffect, useState} from 'react';
import * as ml5 from "ml5";
import './Learn.css';
import Sign from '../../components/Sign';
import { motion } from "framer-motion";

function Learn()
{
  const webCamRef = useRef(null);
  const canvasRef = useRef(null);
  let canvasCtx;
  const [prediction, setPrediction] = useState([{label: 'A', confidence: 0.69420}]);
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
          {color: '#8EF160', lineWidth: 5});
        draw.drawLandmarks(canvasCtx, landmarks, {color: '#49B17F', lineWidth: 2});
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
      model: `${process.env.REACT_APP_BACKEND}/model.json`,
      metadata: `${process.env.REACT_APP_BACKEND}/model_meta.json`,
      weights: `${process.env.REACT_APP_BACKEND}/model.weights.bin`
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
    <motion.div 
      key="learn"
      initial={{y: 0, opacity: 0, scale: 0.5}}
      animate={{y: 0, opacity: 1, scale: 1}}
      transition={{duration: 0.3, ease: "easeOut"}}
      className="flex flex-col lg:flex-row justify-center align-middle items-center lg:h-screen gap-10">
      

      {/* Letter Info */}
      <div className="flex flex-row lg:flex-col lg:w-1/3 min-w-fit justify-center w-full lg:max-w-[750px] align-middle">
        <div className="flex flex-row lg:flex-col lg:gap-10">
          <div className="flex flex-row justify-evenly">
            {/* Alphabet Letter */}
            <div className="text-9xl flex flex-col justify-center alphabet-outline">
              <div className="lg:px-8 px-2">
                <p>A</p>
              </div>
            </div>
            {/* ASL Letter */}
            <div className="alphabet-outline lg:p-8 p-0 flex flex-col justify-center">
              <Sign value="A" color="black" className="lg:w-28 w-20"/>
            </div>
          </div>


          {/* Prediction Info */}
          <div className="flex flex-col border-8 h-auto text-center gap-4 alphabet-outline p-2">
            <p className="lg:text-3xl text-1xl">Current Prediction</p>
            {prediction && 
              <>
                <div className="flex flex-row lg:gap-x-7 gap-x-2 justify-center">
                  <p className="lg:text-8xl text-4xl">{prediction[0].label}</p>
                  <Sign value={prediction[0].label} color="black" size="6rem" className="w-9 lg:w-20"/>
                </div>
                <p class="text-1xl">Confidence: {(prediction[0].confidence*100).toFixed(2)}%</p>
              </>
            }
          </div>

        </div>
      </div>

      {/* Webcam Output */}
      <div className="flex flex-col justify-center align-middle items-center text-center gap-1">
        <p className="text-2xl">Make the letter with your hand</p>
        <canvas className="border-12 border-green-module-text border-solid rounded-3xl max-w-full lg:max-w-full" width={640} height={500} ref={canvasRef}/> 
      </div>
      <Webcam ref={webCamRef} />

    </motion.div>
  )
}

export default Learn;