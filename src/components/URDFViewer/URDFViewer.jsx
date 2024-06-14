import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { useLoaderData, useLocation } from 'react-router-dom';

export const URDFViewer = ({ 
  urdfUrl,
  width,
  height,
  className,
  joint1,
  joint2,
}) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef(); 
  const rendererRef = useRef();
  const robotRef = useRef();
  const setonce = useRef(false);
  const controlsRef = useRef();
  const [controlsEnabled, setControlsEnabled] = useState(true);

  useEffect(() => {
    if (setonce.current) return;
    const container = containerRef.current;
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xffffff);//0x141450

    const camera = new THREE.PerspectiveCamera(75, width / height, 0.001, 1000);
    camera.position.set(5, 5, 5);
    const renderer = new THREE.WebGLRenderer({ antialias: true });

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);

    scene.add(ambientLight);
    scene.add(directionalLight);

    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    setonce.current = true;

    const loader = new URDFLoader();
    loader.load(urdfUrl,
      (robot) => {
        console.log(urdfUrl);
        robotRef.current = robot;
        robot.position.set(0, 0, 0);
        robot.rotation.set(0, 0, 0);
        
        scene.add(robot);

        setTimeout(() => {
          const box = new THREE.Box3().setFromObject(robot);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          const cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));

          const controls = new OrbitControls(camera, renderer.domElement);
          controls.target.set(center.x, center.y, center.z);
          controls.update();
          controlsRef.current = controls;

          camera.position.set(0.12, -0.8, 0.5);
          camera.rotation.set(1, 0, 0);
          cameraRef.current = camera;

        }, 300);
      },
      undefined,
      (error) => {
        console.error("Error loading URDF file:", error);
      });

    const animate = () => {
      requestAnimationFrame(animate);
      if (controlsRef.current && controlsRef.current.enabled) {
        controlsRef.current.update();
      }
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [urdfUrl, width, height]);

  useEffect(() => {
    
    if (robotRef.current) {
      if (robotRef.current.joints['joint1']) {
        robotRef.current.joints['joint1'].setJointValue(-joint1);
        console.log(`Updated joint1 to ${joint1}`);
      } else {
        console.warn('Joint "joint1" not found');
      }
      if (robotRef.current.joints['joint2']) {
        robotRef.current.joints['joint2'].setJointValue(joint2);
        console.log(`Updated joint2 to ${joint2}`);
      } else {
        console.warn('Joint "joint2" not found');
      }
    }
  }, [joint1, joint2]);

  const buttonStyle = {
    color: 'black'
  };

  const moveCameraToPosition1 = () => {
    const camera = cameraRef.current;
    if (camera) {
      camera.position.set(0.12, -0.8, 0.5);
      camera.rotation.set(1, 0, 0);
    }
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const moveCameraToPosition2 = () => {
    const camera = cameraRef.current;
    if (camera) {
      camera.position.set(0.9, -0.3, 0.5);
      camera.rotation.set(0.55 + 1.57, 1.8, -0.7);
    }
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const moveCameraToPosition3 = () => {
    const camera = cameraRef.current;
    if (camera) {
      camera.position.set(0.7, -0.3, 0.0);
      camera.rotation.set(1.48 + 1.57, 0.86, -1.46);
    }
    if (controlsRef.current) {
      controlsRef.current.enabled = false;
    }
  };

  const enableControls = () => {
    if (controlsRef.current) {
      controlsRef.current.enabled = true;
    }
  };

  return (
    <div className={`urdf ${className}`} ref={containerRef}>
      <div style={{ position: 'absolute', top: '10px', left: '10px', zIndex: 1 }}>
        <button style={buttonStyle} onClick={moveCameraToPosition1}>Camera Position 1</button>
        <button style={buttonStyle} onClick={moveCameraToPosition2}>Camera Position 2</button>
        <button style={buttonStyle} onClick={moveCameraToPosition3}>Camera Position 3</button>
        <button style={buttonStyle} onClick={enableControls}>Enable Controls</button>
      </div>
    </div>
  );
};
