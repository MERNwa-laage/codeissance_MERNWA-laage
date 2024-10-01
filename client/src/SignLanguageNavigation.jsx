import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';

const SignLanguageNavigation = () => {
  const videoRef = useRef(null);
  const navigate = useNavigate();
  const [isCooldown, setIsCooldown] = useState(false); // Cooldown state to prevent repeated gestures

  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load();
      console.log('Handpose model loaded.');
      
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setInterval(() => detectHands(net), 300); // Check for gestures every 300ms
      }
    };
    runHandpose();
  }, []);

  const detectHands = async (net) => {
    if (videoRef.current && !isCooldown) { // Only detect if not in cooldown
      const hands = await net.estimateHands(videoRef.current);
      if (hands.length > 0) {
        const gesture = recognizeGesture(hands[0].landmarks);
        if (gesture) {
          handleNavigation(gesture);
        }
      }
    }
  };

  // Gesture recognition logic
  const recognizeGesture = (landmarks) => {
    if (isThumbsUpGesture(landmarks)) {
      return 'createtrip';
    } else if (isFistGesture(landmarks)) {
      return 'home';
    }
    return null; // No gesture detected
  };

  // "Thumbs Up" gesture for navigating to 'createtrip'
  const isThumbsUpGesture = (landmarks) => {
    const thumbTip = landmarks[4]; // Thumb tip
    const indexTip = landmarks[8]; // Index tip
    const middleTip = landmarks[12]; // Middle finger tip
    const ringTip = landmarks[16]; // Ring finger tip
    const pinkyTip = landmarks[20]; // Pinky tip

    // Thumb is up, while other fingers are close to each other (indicating a thumbs up)
    const fistThreshold = 40; // Distance for non-thumb fingers should be within this range
    const thumbUp = thumbTip[1] < indexTip[1]; // Thumb is higher than index (thumbs up)
    
    return (
      thumbUp && 
      Math.abs(indexTip[1] - middleTip[1]) < fistThreshold &&
      Math.abs(middleTip[1] - ringTip[1]) < fistThreshold &&
      Math.abs(ringTip[1] - pinkyTip[1]) < fistThreshold
    );
  };

  // Fist gesture for navigating to 'home'
  const isFistGesture = (landmarks) => {
    const thumbTip = landmarks[4]; 
    const indexTip = landmarks[8]; 
    const middleTip = landmarks[12]; 
    const ringTip = landmarks[16]; 
    const pinkyTip = landmarks[20]; 

    // Check if all finger tips are close together (indicating a fist)
    const distance = (tip1, tip2) => Math.sqrt(
      Math.pow(tip1[0] - tip2[0], 2) + Math.pow(tip1[1] - tip2[1], 2)
    );

    const fistThreshold = 30; // Adjust threshold
    return (
      distance(thumbTip, indexTip) < fistThreshold &&
      distance(indexTip, middleTip) < fistThreshold &&
      distance(middleTip, ringTip) < fistThreshold &&
      distance(ringTip, pinkyTip) < fistThreshold
    );
  };

  // Navigation handling
  const handleNavigation = (gesture) => {
    if (gesture === 'createtrip') {
      navigate('/createtrip');
    } else if (gesture === 'home') {
      navigate('/');
    }

    // Set cooldown to prevent rapid switching
    setIsCooldown(true);
    setTimeout(() => setIsCooldown(false), 3000); // 3 seconds cooldown before detecting another gesture
  };

  return (
    <div style={{ position: 'fixed', left: 0, bottom: 0, width: 200, height: 150 }}>
      <video
        ref={videoRef}
        style={{ width: '100%', height: '100%', transform: 'scaleX(-1)' }}
        autoPlay
        playsInline
      />
    </div>
  );
};

export default SignLanguageNavigation;
