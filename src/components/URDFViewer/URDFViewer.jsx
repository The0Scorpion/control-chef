import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import URDFLoader from 'urdf-loader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export const URDFViewer = ({ 
  urdfUrl,
  className
}) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef(); 
  const rendererRef = useRef();
  var setonce=0;
  useEffect(() => {
    if(setonce==1){return;}
    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1000/ 600, 0.001, 1000);
    camera.position.set(5, 5, 5); // Set initial camera position
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const ambientLight = new THREE.AmbientLight(0xffffff, .5); // Pure white ambient light with full intensity
    const directionalLight = new THREE.DirectionalLight(0xffffff,0.5); // Pure white directional light with full intensity

// Add the lights to the scene
scene.add(ambientLight);
scene.add(directionalLight);
    
    renderer.setSize(1000, 600);
    container.appendChild(renderer.domElement);

    setonce=1;
    const loader = new URDFLoader();
    loader.load(urdfUrl, 
      (robot) => {
        robot.position.set(0,0,0);
        robot.rotation.set(0,0,0);
        scene.add(robot);
        setTimeout(() => {
          const box = new THREE.Box3().setFromObject(robot);
          const center = box.getCenter(new THREE.Vector3());
          const size = box.getSize(new THREE.Vector3());
          // Proceed with further operations using bounding box data
          const maxDim = Math.max(size.x, size.y, size.z);
          const fov = camera.fov * (Math.PI / 180);
          let cameraZ = Math.abs((maxDim / 2) / Math.tan(fov / 2));
          const controls = new OrbitControls(camera, renderer.domElement);
          camera.position.set(0.25, -0.65  ,0.4);
          camera.lookAt(0,0,0);
          camera.rotation.set(1, 0.35 , 0);
          controls.addEventListener('change', () => {
            // Get current camera position
            const currentPosition = camera.position.clone();
        
            // Get current camera rotation (in radians)
            const currentRotation = camera.rotation.clone();
        
            // Print current position and rotation
            console.log('Current Camera Position:', currentPosition);
            console.log('Current Camera Rotation:', currentRotation);
            
        });
        }, 300); // Adjust the delay time as needed
      }, 
      undefined, 
      (error) => {
        console.error("Error loading URDF file:", error);
      });

  
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      const width = 1000;
      const height = 600;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [urdfUrl]);

  return (
    <div className={`urdf ${className}`} ref={containerRef} />
  );
};
