import './App.css';
import React, { Suspense, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import ResponsiveAppBar from './components/layouts/Header';
import { makeStyles } from '@mui/styles';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { OrthographicCamera } from 'three';
import { Button } from '@mui/material';
import { PerspectiveCamera } from 'three';
const Model = () => {
  const ref = useRef()
  // const rest = 
  const scenes = [
    [useLoader(GLTFLoader, "./rest.gltf"), [-137, -40, 200]],
    [useLoader(GLTFLoader, "./office1.gltf"), [-319, -22.25, -210]],
    [useLoader(GLTFLoader, "./office2.gltf"), [-70.7, -40, -32]],
    [useLoader(GLTFLoader, "./indoor.gltf"), [-217.2, -22.25, 93]],
    [useLoader(GLTFLoader, "./meeting.gltf"), [-311, -22.25, 128.35]],

  ]
  // move model:
  // useFrame((state, delta) => { ref.current.rotation.y += 0.000 })
  return (<group ref={ref}>
    {scenes.map((scene, idx) => {
      return (<mesh position={scene[1]} key={idx}>
        <primitive object={scene[0].scene} scale={1} />
      </mesh>)
    })}
  </group>
  );
};
useGLTF.preload('./rest.gltf')
useGLTF.preload('./office1.gltf')
useGLTF.preload('./office2.gltf')
useGLTF.preload('./work1.gltf')

const linear = (x, fn) => (fn(x))

const AnimeGenerate = (fn, fade = linear) => ((camera, time, duration = 2) => {
  if (time < duration) {
    camera.position.x = fade(time / duration, fn)
    camera.position.y = fade(time / duration, fn)
    camera.position.z = fade(time / duration, fn)
    camera.rotation.x = fade(time / duration, fn)
    camera.rotation.y = fade(time / duration, fn)
    camera.rotation.z = fade(time / duration, fn)
  }
  else {
    camera.position.x = fn(1.)
    camera.position.y = fn(1.)
    camera.position.z = fn(1.)
    camera.rotation.x = fn(1.)
    camera.rotation.y = fn(1.)
    camera.rotation.z = fn(1.)
  }
}
)

const Another = () => {
  useFrame(({ clock, camera }) => {
    camera.position.set(-80, 0, -20)
    camera.rotation.set(0, -Math.PI / 6, 0)
  })
  return null
}

function Dolly(state_in) {
  // This one makes the camera move in and out

  useFrame((state, delta) => {
    // camera.position.z = 0 + Math.sin(clock.getElapsedTime()) * 30
    // camera.rotation.y = Math.PI * Math.cos(clock.getElapsedTime() * 0.25)
    // camera.rotation.y = Math.PI
    // camera.position.z = -20

    // News
    if (state_in.state_in) {

      state.camera.position.set(-30, 0, 100)
      state.camera.rotation.set(0, 0, 0)
      state.camera.setFocalLength(40 + 10 * Math.sin(state.clock.getElapsedTime() * 2))
      state.camera.updateProjectionMatrix();
    } else {
      state.camera.position.set(-80, 0, -20)
      state.camera.rotation.set(0, -Math.PI / 6, 0)
      state.camera.setFocalLength(40 + 10 * Math.sin(state.clock.getElapsedTime() * 2))
      state.camera.updateProjectionMatrix();
    }
    // console.log(state_in.state_in)
    // (state_in)
    // camera.setFocalLength(state ? 60 : 30)

    // // About
    // camera.position.set(-80, 0, -20)
    // camera.rotation.set(0, -Math.PI / 6, 0)

    // // Research
    // camera.position.set(-45, 0, 210)
    // camera.rotation.set(0, Math.PI / 9, 0)

    // // People
    // camera.position.set(-20, -5, -30)
    // camera.rotation.set(0, -Math.PI / 12 * 5, 0)

    // // Join Us
    // camera.position.set(-40, -3, 80)
    // camera.rotation.set(0, Math.PI / 24 * 5, 0)

    // console.log(camera.rotation)

  })
  return null
}

const Scene = (state) => {
  var camera = new PerspectiveCamera({ fov: 60, position: [0, 0, 0] })

  return (
    <Canvas className='Canvas' camera={camera}>
      <Suspense fallback={null}>
        <directionalLight />
        <ambientLight color={0x7f7f7f} />
        <Model />
        {/* <OrbitControls /> */}
        {/* <Dolly /> */}
        <Dolly state_in={state.state} />
        {/* {state ? (<Another />) : (<Dolly state={state} />)} */}
      </Suspense>
    </Canvas>
  );
}

const fn = function (x, y, z)
{
  if (x === "News" && y === "About")
  {
    if( z <= 0.4) { let tmp = z;  camera.position.set(-30 + 30 * tmp, 0, 100 - 200 * tmp); camera.rotation.set(0,0,0);}
    else if( z <= 0.5) {let tmp = z - 0.4;  camera.position.set(-18 + 10 * tmp, 0, 20 - 200 * tmp);  camera.rotation.set(0,0,0);}
    else if(z <= 0.6) {let tmp = z - 0.5; camera.position.set(-17, 0, -200 * tmp); camera.rotation.set(0, 0, 0);}
    else if( z <= 0.7) {let tmp = z - 0.6; camera.position.set(-17 - 30 * tmp, 0, -20); camera.rotation.set(0, - Math.PI * tmp / 2.4, 0);}
    else if( z <= 1 ) {let tmp = z - 0.7; camera.position.set( -20 - 200 * tmp, 0, -20); camera.rotation.set(0, - Math.PI / 24 - Math.PI * tmp / 2.4, 0);}
  }
  else if (x === "About" && y === "News")
  {
    if(z <= 0.3) {let tmp = z;  camera.position.set(-80 + 200 * tmp, 0, -20); camera.rotation.set(0, - Math.PI / 6 + Math.PI * tmp / 2.4, 0);}
    else if( z <= 0.4) { let tmp = z - 0.3; camera.position.set(-20 + 30 * tmp, 0, -20); camera.rotation.set(0, - Math.PI / 24 + Math.PI * tmp / 2.4, 0);}
    else if( z <= 0.5) { let tmp = z - 0.4; camera.position.set(-17, 0, -20 + 200 * tmp); camera.rotation.set(0, 0, 0);}
    else if( z <= 0.6) { let tmp = z- 0.5; camera.position.set(-17 - 10 * tmp, 0, 200 * tmp); camera.rotation.set(0, 0, 0);}
    else if( z <= 1) { let tmp = z - 0.6; camera.position.set(-18 - 30 * tmp, 0, 20 + 200 * tmp); camera.rotation.set(0, 0, 0);}
  }
  else if(x === "About" && y === "Research")
  {
    if( z <= 0.3) {let tmp = z; camera.position.set(-80 + 200 * tmp, 0, -20); camera.rotation.set(0, -Math.PI / 6 + Math.PI * tmp / 2.4, 0);}
    else if( z <= 0.4) {let tmp = z - 0.3; camera.position.set(-20 + 30 * tmp, 0, -20); camera.rotation.set(0, - Math.PI / 24 + Math.PI * tmp / 2.4, 0);}
    else if( z <= 0.5) {let tmp = z - 0.4; camera.position.set(-17, -20 + 2200 * tmp, 0); camera.rotation.set(0, 0, 0);}
    else if( z <= 0.6) {let tmp = z - 0.5; camera.position.set(-17 - 30 * tmp, 200 + 100 * tmp, 0); camera.rotation.set(0, 0, 0);}
    else if( z <= 0.7) {let tmp = z - 0.6; camera.position.set(-20 - 150 * tmp, 0, 210); camera.rotation.set(0, Math.PI * tmp / 1.8, 0);}
    else if( z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-35 - 10 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 18 + Math.PI * tmp / 1.8, 0);}
  }
  else if(x === "Research" && y === "About")
  {
    if(z <= 0.3) {let tmp = z / 3; camera.position.set(-45 + 10 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 9 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 0.4) {let tmp = z - 0.3; camera.position.set(-35 + 150 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 18 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 0.5) {let tmp = z - 0.4; camera.position.set(-20 + 30 * tmp, 210 - 100 * tmp, 0); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.6) {let tmp = z - 0.5; camera.position.set(-17, 200 - 2200 * tmp, 0); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.7) {let tmp = z - 0.6; camera.position.set(-17 - 30 * tmp, 0, -20); camera.rotation.set(0, - Math.PI * tmp / 2.4, 0);}
    else if(z <= 1) {let tmp = z - 0.7; camera.position.set(-20 - 200 * tmp, 0, -20); camera.rotation.set(0, -Math.PI / 24 - Math.PI * tmp / 2.4, 0);}
  }
  else if(x === "Research" && y === "People")
  {
    if(z <= 0.1) {let tmp = z; camera.position.set(-45 + 100 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 9 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 0.2) {let tmp = z - 0.1; camera.position.set(-35 + 150 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 18 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 0.3) {let tmp = z - 0.2; camera.rotation.set(-20 + 30 * tmp, 0, 210 - 100 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.4) {let tmp = z - 0.3; camera.position.set(-17, 0, 200 - 2200 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.8) {let tmp = z - 0.4; camera.position.set(-17 - 7.5 * tmp, - 10 * tmp, -20 - 20 * tmp); camera.rotation.set(0, - Math.PI * tmp / 1.2, 0);}
    else if(z <= 1) {let tmp = (z - 0.8) / 2; camera.position.set(-20, -4 - 10 * tmp, -28 - 20 * tmp); camera.rotation.set(0, -Math.PI * 4 / 12 - Math.PI * tmp / 1.2, 0);}
  }
  else if(x === "People" && y === "Research")
  {
    if(z <= 0.2) {let tmp = z / 2; camera.position.set(-20, -5 + 10 * tmp, - 30 + 20 * tmp); camera.rotation.set(0, -Math.PI * 5 / 12 + Math.PI * tmp / 1.2, 0);}
    else if(z <= 0.6) {let tmp = z - 0.2; camera.position.set(-20 + 7.5 * tmp, -4 + 10 * tmp, -28 + 20 * tmp); camera.rotation.set(0, -Math.PI * 4 / 12 + Math.PI * tmp / 1.2, 0);}
    else if(z <= 0.7) {let tmp = z - 0.6; camera.position.set(-17, 0, -20 + 2200 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.8) {let tmp = z - 0.7; camera.rotation.set(-17 - 30 * tmp, 0, 200 + 100 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.9) {let tmp = z - 0.8; camera.position.set(-20 - 150 * tmp, 0, 210); camera.rotation.set(0, + Math.PI * tmp / 1.8, 0);}
    else if(z <= 1) {let tmp = z - 0.9; camera.position.set(-35 - 100 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 18 + Math.PI * tmp / 1.8, 0);}
  }
  else if(x === "People" && y === "Join Us")
  {
    if(z <= 0.4) {let tmp = z / 4; camera.position.set(-20 + 30 * tmp, -5 + 50 * tmp, -30 + 100 * tmp); camera.rotation.set(0, -Math.PI * 5 / 12 + Math.PI * 5 * tmp / 1.2, 0);}
    else if(z <= 0.7) {let tmp = (z - 0.4) / 3; camera.position.set(-17, 0, -20 + 1000 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-17 - 230 * tmp, -30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 * tmp / 2.4, 0);}
  }
  else if(x === "Join Us" && y === "People")
  {
    if(z <= 0.3) {let tmp = z / 3; camera.position.set(-40 + 230 * tmp, -3 + 30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0);}
    else if(z <= 0.6) {let  tmp =(z - 0.3) / 3; camera.position.set(-17, 0, 80 - 1000 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.6)/4; camera.position.set(-17 - 30 * tmp, -20 - 100 * tmp); camera.rotation.set(0, -Math.PI * 5 * tmp / 1.2, 0);}
  }
  else if(x === "Join Us" && y === "News")
  {
    let tmp = z / 10; camera.position.set(-40 + 100 * tmp, -3 + 30 * tmp, 80 + 200 * tmp);  camera.rotation.set(0, Math.PI * 5 / 24 - Math.PI * 5 * tmp/ 2.4, 0);
  }
  else if(x === "News" && y === "Join Us")
  {
    let tmp = z / 10; camera.position.set(-30 - 100 * tmp,  -30 * tmp, 100 - 200 * tmp);  camera.rotation.set(0, Math.PI * 5 * tmp / 2.4, 0);
  }
  else if(x === "News" && y === "Research")
  {
    if(z <= 0.4) {let tmp = z / 4; camera.position.set(-30 + 130 * tmp, 0, 100); camera.rotation.set(0, 0, 0);}
    else if(z <= 0.7) {let tmp = (z - 0.4) / 3; camera.position.set(-17, 0, 100 + 1100 * tmp); camera.rotation.set(0, Math.PI * tmp / 1.8, 0);}
    else if(z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-17 - 280 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 18 + Math.PI * tmp / 1.8, 0);}
  }
  else if(x === "Research" && y === "News")
  {
    if(z <= 0.3) {let tmp = z / 3; camera.position.set(-45 + 280 * tmp, 0, 210); camera.rotation.set(0, Math.PI / 9 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 0.6) {let tmp = (z - 0.3) / 3; camera.position.set(-17, 0, 210 - 1100 * tmp); camera.rotation.set(0, Math.PI / 18 - Math.PI * tmp / 1.8, 0);}
    else if(z <= 1) {let tmp = (z - 0.6) / 4; camera.position.set(-17 - 130 * tmp, 0, 100); camera.rotation.set(0, 0, 0);}
  }
  else if(x === "About" && y === "People")
  {
    let tmp = z / 10; camera.position.set(-80 + 600 * tmp,  -50 * tmp, - 300 * tmp);  camera.rotation.set(0, -Math.PI / 6 - Math.PI * tmp / 0.4, 0);
  }
  else if(x === "People" && y === "About")
  {
    let tmp = z / 10; camera.position.set(-20 - 600 * tmp,  -5 + 50 * tmp, -30 + 300 * tmp);  camera.rotation.set(0, -Math.PI / 6 - Math.PI * tmp / 0.4, 0);
  }
  else if(x === "Research" && y === "Join Us")
  {
    if(z <= 0.4) {let tmp = z / 4; camera.position.set(-45 + 280 * tmp, 0, 210); camera.rotation.set(0, Math.PI * 1 / 9 - Math.PI * tmp / 0.9, 0);}
    else if(z <= 0.7) {let tmp = (z - 0.4) / 3; camera.position.set(-17, 0, 210 - 1300 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-17 - 230 * tmp, -30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 * tmp / 2.4, 0);}
  }
  else if(x === "Join Us" && y === "Research")
  {
    if(z <= 0.3) {let tmp = z / 3; camera.position.set(-40 + 230 * tmp, -3 + 30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0);}
    else if(z <= 0.6) {let tmp = (z - 0.3) / 3; camera.position.set(-17, 0, 80 + 1300 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.6) / 4; camera.position.set(-17 - 280 * tmp, 0, 210); camera.rotation.set(0, + Math.PI * tmp / 0.9, 0);}
  }
  else if(x === "People" && y === "News")
  {
    if(z <= 0.4) {let tmp = z / 4; camera.position.set(-20 + 30 * tmp, -5 + 50 * tmp, -30); camera.rotation.set(0, -Math.PI * 5 / 12 + Math.PI * 4 * tmp / 1.2, 0);}
    if(z <= 0.7) {let tmp = (z - 0.4) / 3; camera.position.set(-17, 0, -30 + 1300 * tmp); camera.rotation.set(0, -Math.PI * 1 / 12, 0);}
    if(z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-17 - 130 * tmp, -0, 100); camera.rotation.set(0, -Math * 1 /12 + Math.PI * tmp / 1.2, 0);}
  }
  else if(x === "News" && y === "People")
  {
    if(z <= 0.3) {let tmp = z / 3;  camera.position.set(-30 + 130 * tmp, 0, 100); camera.rotation.set(0, Math.PI * tmp / 1.2, 0);}
    else if(z <= 0.6) {let tmp = (z - 0.3) / 3; camera.position.set(-17, 0, 100 - 1300 * tmp); camera.rotation.set(0, -Math.PI * 1 / 12, 0);}
    else if(z <= 1) {let tmp = (z -0.6) / 4; camera.position.set(-17 - 30 * tmp, -50 * tmp, -30); camera.rotation.set(0, -Math.PI * 1 / 12 - Math.PI * 4 * tmp / 1.2, 0);}
  }
  else if(x === "Join Us" && y === "About")
  {
    if(z <= 0.4) {let tmp = z / 4; camera.position.set(-40 + 230 * tmp, -3 + 30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0);}
    else if(z <= 0.7) {let tmp = (z - 0.4) / 3; camera.position.set(-17, 0, 80 - 1000 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.7) / 3; camera.position.set(-17 - 630 * tmp, 0, -20); camera.rotation.set(0, -Math.PI * tmp / 0.6, 0);}
  }
  else if(x === "About" && y === "Join Us")
  {
    if(z <= 0.3) {let tmp = z / 3; camera.position.set(-80 + 650 * tmp, 0, -20); camera.rotation.set(0, -Math.PI / 6 + Math.PI * tmp / 0.6, 0);}
    else if(z <= 0.6) {let tmp = (z - 0.3) / 3; camera.position.set(-17, 0, -20 + 1000 * tmp); camera.rotation.set(0, 0, 0);}
    else if(z <= 1) {let tmp = (z - 0.6) / 4; camera.position.set(-17 - 230 * tmp, -30 * tmp, 80); camera.rotation.set(0, Math.PI * 5 * tmp/ 2.4, 0);}
  }
}

const useStyles = makeStyles(theme => ({
  appbar: { position: 'sticky', top: 0 },
  body: { position: 'sticky', top: 0 },
}))

function App() {
  const [state, setState] = useState(true)

  const classes = useStyles();
  return (<>
    {/* <ResponsiveAppBar className={classes.appbar}></ResponsiveAppBar> */}
    <Button onClick={() => { setState(!state); console.log(state) }}>Click me{state ? "" : ": Freeze!"}</Button>
    <body className={classes.body}>
      <div className="App">
        <Scene state={state} />
      </div>
    </body>
  </>
  );
}

export default App;
