import React, { forwardRef, Suspense, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { makeStyles } from '@mui/styles';
import { Box, Button, Grid, Typography } from '@mui/material';

import SvgButton from '../components/elements/SvgButton';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { Object3D } from 'three';

const Model = () => {
  const ref = useRef()
  const scenes = useLoader(GLTFLoader,
    ["/rest.glb",
      "/office1.glb",
      "/office2.glb",
      "/indoor.glb",]);
  const locations =
    [[-137, -40, 200],
    [-319, -22.25, -210],
    [-70.7, -40, -32],
    [-217.2, -22.25, 93],
    ]


  return (
    <group ref={ref}>
      {scenes.map((scene, idx) => {
        return (<mesh position={locations[idx]} key={idx}>
          <primitive object={scene.scene} scale={1} />
        </mesh>)
      })}
    </group>
  );
};

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

const PathGenerate = (src, dst) => (t) => {
  if (t < 1) {
    return [
      src[0] * (1 - t) + dst[0] * t,
      src[1] * (1 - t) + dst[1] * t,
      src[2] * (1 - t) + dst[2] * t,
      src[3] * (1 - t) + dst[3] * t,
      src[4] * (1 - t) + dst[4] * t,
      src[5] * (1 - t) + dst[5] * t,
    ]
  } else {
    return dst;
  }
}

const Dolly = (states) => {
  // This one makes the camera move in and out

  useFrame((state, delta) => {
    if (states.tab === 'Home') {
      state.camera.position.z = 0 + Math.sin(state.clock.getElapsedTime()) * 30
      state.camera.rotation.y = Math.PI * Math.cos(state.clock.getElapsedTime() * 0.25)
    } else if (states.tab === 'News') {
      state.camera.position.set(-30, 0, 100)
      // state.camera.position.set(position[0], position[1], position[2])
      state.camera.rotation.set(0, 0, 0)
    } else if (states.tab === 'About') {
      state.camera.position.set(-80, 0, -20)
      state.camera.rotation.set(0, -Math.PI / 6, 0)
    } else if (states.tab === 'Research') {
      state.camera.position.set(-45, 0, 210)
      state.camera.rotation.set(0, Math.PI / 9, 0)
    } else if (states.tab === 'People') {
      state.camera.position.set(-20, -5, -30)
      state.camera.rotation.set(0, -Math.PI / 12 * 5, 0)
    } else if (states.tab === 'Join Us') {
      state.camera.position.set(-40, -3, 80)
      state.camera.rotation.set(0, Math.PI / 24 * 5, 0)
    } else {
      alert("invalid")
    }
    state.camera.setFocalLength(40 + 10 * Math.sin(state.clock.getElapsedTime() * 2))
    state.camera.updateProjectionMatrix();

  })
  return null
}

const RefDolly = forwardRef((states, ref) => {
  const [trigger, setTrigger] = useState(-1);
  const [fn, setFn] = useState(() => ((t) => [t, 0, 0, 0, 0, 0]));
  const clock = useThree((state) => state.clock)
  const camera = useThree((state) => state.camera)
  useImperativeHandle(ref, () => ({
    setTrig: (tab, option) => {
      if (tab !== option) {
        setTrigger(clock.getElapsedTime())
      }
    },
    setF: (tab, option) => {
      var dst = null
      if (option === 'Home') {
        dst = [0, 0, 0, 0, 0, 0]
      } else if (option === 'News') {
        dst = [-30, 0, 100, 0, 0, 0]
      } else if (option === 'About') {
        dst = [-80, 0, -20, 0, -Math.PI / 6, 0]
      } else if (option === 'Research') {
        dst = [-45, 0, 210, 0, Math.PI / 9, 0]
      } else if (option === 'People') {
        dst = [-20, -5, -30, 0, -Math.PI / 12 * 5, 0]
      } else if (option === 'Join Us') {
        dst = [-40, -3, 80, 0, Math.PI / 24 * 5, 0]
      } else {
        alert("invalid")
      }
      if (tab !== option) {
        setFn(() => (
          tab === 'Home' || option === 'Home' ?
            PathGenerate([
              camera.position.x,
              camera.position.y,
              camera.position.z,
              camera.rotation.x,
              camera.rotation.y,
              camera.rotation.z,
            ], dst) : SmoothPathGenerate(
              tab, option
            )
        ))
      }
    }
  }));
  useFrame((state, delta) => {
    if (states.tab === "Home") {
      state.camera.position.set(0, 0, 0)
      state.camera.rotation.set(0, 0, 0)
      state.camera.position.z = 0 + Math.sin(state.clock.getElapsedTime()) * 30
      state.camera.rotation.y = Math.PI * Math.cos(state.clock.getElapsedTime() * 0.25)
    } else {
      const position = fn((state.clock.getElapsedTime() - trigger) / 1)
      state.camera.position.set(position[0], position[1], position[2])
      state.camera.rotation.set(position[3], position[4], position[5])
      // state.camera.setFocalLength(40 + 10 * Math.sin(state.clock.getElapsedTime() * 2))
    }
    state.camera.updateProjectionMatrix();
    // console.log(state.camera.position)
  })
  return null
})

const AddTarget = (props) => {
  const { scene } = useThree();
  scene.add(props.target);
  return null;
}

const Scene = (states) => {
  const targetObject = new Object3D();
  return (
    <Canvas className='Canvas'>
      <Suspense fallback={null}>
        <AddTarget target={targetObject} />
        <directionalLight color={0xffffff} intensity={1} target={targetObject} castShadow={true} />
        <ambientLight color={0xffffff} intensity={0.5} />
        <hemisphereLight color={0xffffff} intensity={0.1} />
        <Model />
        {/* <OrbitControls /> */}
        <RefDolly ref={states.cref} state_in={states.state} tab={states.tab} />
      </Suspense>
    </Canvas>
  );
}

const SmoothPathGenerate = (x, y) => (z) => {
  const inner = SmoothPathGenerateInner(x, y)
  if (z < 1) { return inner(z) }
  else { return inner(1) }
}
const SmoothPathGenerateInner = (x, y) => (z) => {
  if (x === y) { alert('Not allowed!') }
  else if (x === "News" && y === "About") {
    if (z <= 0.4) { let tmp = z; return [-30 + 30 * tmp, 0, 100 - 200 * tmp, 0, 0, 0]; }
    else if (z <= 0.5) { let tmp = z - 0.4; return [-18 + 10 * tmp, 0, 20 - 200 * tmp, 0, 0, 0]; }
    else if (z <= 0.6) { let tmp = z - 0.5; return [-17, 0, -200 * tmp, 0, 0, 0]; }
    else if (z <= 0.7) { let tmp = z - 0.6; return [-17 - 30 * tmp, 0, -20, 0, - Math.PI * tmp / 2.4, 0]; }
    else { let tmp = z - 0.7; return [-20 - 200 * tmp, 0, -20, 0, - Math.PI / 24 - Math.PI * tmp / 2.4, 0]; }
  }
  else if (x === "About" && y === "News") {
    if (z <= 0.3) { let tmp = z; return [-80 + 200 * tmp, 0, -20, 0, - Math.PI / 6 + Math.PI * tmp / 2.4, 0]; }
    else if (z <= 0.4) { let tmp = z - 0.3; return [-20 + 30 * tmp, 0, -20, 0, - Math.PI / 24 + Math.PI * tmp / 2.4, 0]; }
    else if (z <= 0.5) { let tmp = z - 0.4; return [-17, 0, -20 + 200 * tmp, 0, 0, 0]; }
    else if (z <= 0.6) { let tmp = z - 0.5; return [-17 - 10 * tmp, 0, 200 * tmp, 0, 0, 0]; }
    else { let tmp = z - 0.6; return [-18 - 30 * tmp, 0, 20 + 200 * tmp, 0, 0, 0]; }
  }
  else if (x === "About" && y === "Research") {
    if (z <= 0.3) { let tmp = z; return [-80 + 200 * tmp, 0, -20, 0, -Math.PI / 6 + Math.PI * tmp / 2.4, 0]; }
    else if (z <= 0.4) { let tmp = z - 0.3; return [-20 + 30 * tmp, 0, -20, 0, - Math.PI / 24 + Math.PI * tmp / 2.4, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, -20 + 2200 * tmp, 0, 0, 0]; }
    else if (z <= 0.8) { let tmp = z - 0.7; return [-17 - 30 * tmp, 0, 200 + 100 * tmp, 0, 0, 0]; }
    else if (z <= 0.9) { let tmp = z - 0.8; return [-20 - 150 * tmp, 0, 210, 0, Math.PI * tmp / 1.8, 0]; }
    else { let tmp = z - 0.9; return [-35 - 100 * tmp, 0, 210, 0, Math.PI / 18 + Math.PI * tmp / 1.8, 0]; }
  }
  else if (x === "Research" && y === "About") {
    if (z <= 0.1) { let tmp = z; return [-45 + 100 * tmp, 0, 210, 0, Math.PI / 9 - Math.PI * tmp / 1.8, 0]; }
    else if (z <= 0.2) { let tmp = z - 0.1; return [-35 + 150 * tmp, 0, 210, 0, Math.PI / 18 - Math.PI * tmp / 1.8, 0]; }
    else if (z <= 0.3) { let tmp = z - 0.2; return [-20 + 30 * tmp, 0, 210 - 100 * tmp, 0, 0, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, 200 - 2200 * tmp, 0, 0, 0]; }
    else if (z <= 0.7) { let tmp = z - 0.6; return [-17 - 30 * tmp, 0, -20, 0, - Math.PI * tmp / 2.4, 0]; }
    else { let tmp = z - 0.7; return [-20 - 200 * tmp, 0, -20, 0, -Math.PI / 24 - Math.PI * tmp / 2.4, 0]; }
  }
  else if (x === "Research" && y === "People") {
    if (z <= 0.1) { let tmp = z; return [-45 + 100 * tmp, 0, 210, 0, Math.PI / 9 - Math.PI * tmp / 1.8, 0]; }
    else if (z <= 0.2) { let tmp = z - 0.1; return [-35 + 150 * tmp, 0, 210, 0, Math.PI / 18 - Math.PI * tmp / 1.8, 0]; }
    else if (z <= 0.3) { let tmp = z - 0.2; return [-20 + 30 * tmp, 0, 210 - 100 * tmp, 0, 0, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.3) / 4; return [-17, 0, 200 - 2200 * tmp, 0, 0, 0]; }
    else if (z <= 0.8) { let tmp = z - 0.7; return [-17 - 30 * tmp, - 40 * tmp, -20 - 80 * tmp, 0, - Math.PI * 4 * tmp / 1.2, 0]; }
    else { let tmp = (z - 0.8) / 2; return [-20, -4 - 10 * tmp, -28 - 20 * tmp, 0, -Math.PI * 4 / 12 - Math.PI * tmp / 1.2, 0]; }
  }
  else if (x === "People" && y === "Research") {
    if (z <= 0.2) { let tmp = z / 2; return [-20, -5 + 10 * tmp, - 30 + 20 * tmp, 0, -Math.PI * 5 / 12 + Math.PI * tmp / 1.2, 0]; }
    else if (z <= 0.3) { let tmp = z - 0.2; return [-20 + 30 * tmp, -4 + 40 * tmp, -28 + 80 * tmp, 0, -Math.PI * 4 / 12 + Math.PI * 4 * tmp / 1.2, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.3) / 4; return [-17, 0, -20 + 2200 * tmp, 0, 0, 0]; }
    else if (z <= 0.8) { let tmp = z - 0.7; return [-17 - 30 * tmp, 0, 200 + 100 * tmp, 0, 0, 0]; }
    else if (z <= 0.9) { let tmp = z - 0.8; return [-20 - 150 * tmp, 0, 210, 0, + Math.PI * tmp / 1.8, 0]; }
    else { let tmp = z - 0.9; return [-35 - 100 * tmp, 0, 210, 0, Math.PI / 18 + Math.PI * tmp / 1.8, 0]; }
  }
  else if (x === "People" && y === "Join Us") {
    if (z <= 0.4) { let tmp = z / 4; return [-20 + 30 * tmp, -5 + 50 * tmp, -30 + 100 * tmp, 0, -Math.PI * 5 / 12 + Math.PI * 5 * tmp / 1.2, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, -20 + 1000 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.7) / 3; return [-17 - 230 * tmp, -30 * tmp, 80, 0, Math.PI * 5 * tmp / 2.4, 0]; }
  }
  else if (x === "Join Us" && y === "People") {
    if (z <= 0.3) { let tmp = z / 3; return [-40 + 230 * tmp, -3 + 30 * tmp, 80, 0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, 80 - 1000 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.6) / 4; return [-17 - 30 * tmp, -50 * tmp, -20 - 100 * tmp, 0, -Math.PI * 5 * tmp / 1.2, 0]; }
  }
  else if (x === "Join Us" && y === "News") {
    let tmp = z / 10; return [-40 + 100 * tmp, -3 + 30 * tmp, 80 + 200 * tmp, 0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0];
  }
  else if (x === "News" && y === "Join Us") {
    let tmp = z / 10; return [-30 - 100 * tmp, -30 * tmp, 100 - 200 * tmp, 0, Math.PI * 5 * tmp / 2.4, 0];
  }
  else if (x === "News" && y === "Research") {
    if (z <= 0.4) { let tmp = z / 4; return [-30 + 130 * tmp, 0, 100, 0, 0, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, 100 + 1100 * tmp, 0, Math.PI * tmp / 1.8, 0]; }
    else { let tmp = (z - 0.7) / 3; return [-17 - 280 * tmp, 0, 210, 0, Math.PI / 18 + Math.PI * tmp / 1.8, 0]; }
  }
  else if (x === "Research" && y === "News") {
    if (z <= 0.3) { let tmp = z / 3; return [-45 + 280 * tmp, 0, 210, 0, Math.PI / 9 - Math.PI * tmp / 1.8, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, 210 - 1100 * tmp, 0, Math.PI / 18 - Math.PI * tmp / 1.8, 0]; }
    else { let tmp = (z - 0.6) / 4; return [-17 - 130 * tmp, 0, 100, 0, 0, 0]; }
  }
  else if (x === "About" && y === "People") {
    let tmp = z / 10; return [-80 + 600 * tmp, -50 * tmp, -20 - 100 * tmp, 0, -Math.PI / 6 - Math.PI * tmp / 0.4, 0];
  }
  else if (x === "People" && y === "About") {
    let tmp = z / 10; return [-20 - 600 * tmp, -5 + 50 * tmp, -30 + 100 * tmp, 0, -Math.PI * 5 / 12 + Math.PI * tmp / 0.4, 0];
  }
  else if (x === "Research" && y === "Join Us") {
    if (z <= 0.4) { let tmp = z / 4; return [-45 + 280 * tmp, 0, 210, 0, Math.PI * 1 / 9 - Math.PI * tmp / 0.9, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, 210 - 1300 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.7) / 3; return [-17 - 230 * tmp, -30 * tmp, 80, 0, Math.PI * 5 * tmp / 2.4, 0]; }
  }
  else if (x === "Join Us" && y === "Research") {
    if (z <= 0.3) { let tmp = z / 3; return [-40 + 230 * tmp, -3 + 30 * tmp, 80, 0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, 80 + 1300 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.6) / 4; return [-17 - 280 * tmp, 0, 210, 0, + Math.PI * tmp / 0.9, 0]; }
  }
  else if (x === "People" && y === "News") {
    if (z <= 0.4) { let tmp = z / 4; return [-20 + 30 * tmp, -5 + 50 * tmp, -30, 0, -Math.PI * 5 / 12 + Math.PI * 4 * tmp / 1.2, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, -30 + 1300 * tmp, 0, -Math.PI * 1 / 12, 0]; }
    else { let tmp = (z - 0.7) / 3; return [-17 - 130 * tmp, 0, 100, 0, -Math.PI / 12 + Math.PI * tmp / 1.2, 0]; }
  }
  else if (x === "News" && y === "People") {
    if (z <= 0.3) { let tmp = z / 3; return [-30 + 130 * tmp, 0, 100, 0, Math.PI * tmp / 1.2, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, 100 - 1300 * tmp, 0, -Math.PI * 1 / 12, 0]; }
    else { let tmp = (z - 0.6) / 4; return [-17 - 30 * tmp, -50 * tmp, -30, 0, -Math.PI * 1 / 12 - Math.PI * 4 * tmp / 1.2, 0]; }
  }
  else if (x === "Join Us" && y === "About") {
    if (z <= 0.4) { let tmp = z / 4; return [-40 + 230 * tmp, -3 + 30 * tmp, 80, 0, Math.PI * 5 / 24 - Math.PI * 5 * tmp / 2.4, 0]; }
    else if (z <= 0.7) { let tmp = (z - 0.4) / 3; return [-17, 0, 80 - 1000 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.7) / 3; return [-17 - 630 * tmp, 0, -20, 0, -Math.PI * tmp / 0.6, 0]; }
  }
  else if (x === "About" && y === "Join Us") {
    if (z <= 0.3) { let tmp = z / 3; return [-80 + 650 * tmp, 0, -20, 0, -Math.PI / 6 + Math.PI * tmp / 0.6, 0]; }
    else if (z <= 0.6) { let tmp = (z - 0.3) / 3; return [-17, 0, -20 + 1000 * tmp, 0, 0, 0]; }
    else { let tmp = (z - 0.6) / 4; return [-17 - 230 * tmp, -30 * tmp, 80, 0, Math.PI * 5 * tmp / 2.4, 0]; }
  }
}

const useStyles = makeStyles(theme => ({
  main: { position: 'relative', display: 'inline-block', width: '100%', height: '100%' },
  appbar: { position: 'sticky', top: 0 },
  canvas: { position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' },
  header: {
    background: 'rgba(0,0,0,0.5)', position: 'relative',
    height: '100vh',
    // width: '20%',
    minWidth: '20rem',
    maxWidth: '6rem',
  },
  container: { width: '100%', height: '100%' },
  logoBox: { maxHeight: '10vh', width: '100%', height: '100%', display: 'flex', justifyContent: 'center', paddingBottom: '5rem', paddingTop: '2rem' },
  tabBox: { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '10vh' },
}))

// Home, News, Research, People, Join Us, About

function Home() {
  const controlRef = useRef();
  const tabs = [
    ['Home', 'home'],
    ['News', 'news'],
    ['Research', 'research'],
    ['People', 'people'],
    ['Join Us', 'joinus'],
    ['About', 'about'],
  ]
  const [state, setState] = useState(true)
  const [tab, setTab] = useState("Home")
  const [jump, setJump] = useState("Home")
  const [mounted, setMounted] = useState(false)
  const classes = useStyles();

  useEffect(() => { setMounted(true) }, [])

  return (
    <div className={classes.main}>
      <div className={classes.canvas}>
        <div className="App">
          {mounted ?
            <Scene cref={controlRef} state={state} tab={tab} /> : null}
        </div>
      </div>
      <Grid container className={classes.container} >
        <Grid item xs={12} sm={12} md={2} lg={2} className={classes.header}>
          <Box className={classes.logoBox}>
            <img src='./site-logo.png' alt='site-logo' style={{ maxWidth: "100%", maxHeight: "100%" }} />
          </Box>
          {tabs.map((x, idx) => (
            <Box className={classes.tabBox}>
              <SvgButton key={idx} onClick={() => {
                setState(!state);
                setTab(x[0]);
                setJump(x[1]);
                controlRef.current && controlRef.current.setTrig(tab, x[0])
                controlRef.current && controlRef.current.setF(tab, x[0])
              }}>
                {x[0]}
              </SvgButton>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12} sm={12} md lg sx={{
          height: '100vh',
          padding: '3rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
          // width: '20%',
        }}>
          {/* <Box sx={{minHeight: '20rem'}}></Box> */}
          <Box sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}>

            <Box sx={{
              background: 'rgba(0,0,0,0.5)', position: 'relative',
              color: 'white',
              padding: 1,
              maxHeight: '90vh',
              // minHeight: '60rem',
              maxWidth: '50rem',
              overflow: 'auto',
              marginRight: '-3.5rem'
            }}>
              <Box sx={{
                margin: '2rem',
                fontFamily: 'Tahoma',
                fontSize: '1rem',
                lineHeight: '1.5rem',
              }} >
                {tab === 'Research' &&
                  <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}><>
                    <Typography
                      fontFamily='Verdana'
                      variant='h4'
                      marginBottom='2rem'
                    >AIR-DISCOVER Teams</Typography>
                    <>
                      AIR DISCOVER SUN Team is mainly focusing on computer vision which is the art of tracing light, along two paths:
                      <br />
                      - From images to the physical world;
                      <br />
                      - From images to our brains.
                      <br />
                      We believe a methodology that integrates data-driven recognition and closed-form reconstruction would lead to a comprehensive understanding of the world, facilitating emerging AI-empowered robotics applications that collaborate with people.
                      <br />

                      <br />
                      AIR DISCOVER HCI Team is a Human-centered AI research team that focuses on creating AI-driven systems that amplify and augment human abilities and well-being：
                      <br />
                      - Understanding and modeling long-term human behaviors and emotions in the real world through wearable or ubiquitous contactless sensors；
                      <br />
                      - Building novelty human-in-the-loop AI/Robotics systems；
                      <br />
                      - Exploring methods and algorithms enabling effective human-AI collaboration that make human partnerships more productive, creative, accessible, and enjoyable.
                      <br />

                      <br />
                      AIR DISCOVER Hardware Lab aims to fulfill the requirement of robotics research in AIR, especially to unleash the potential of novel sensor/actuator systems for the mobility of robots and 3D printing for various rapid material forming.
                    </>
                  </>
                    <Box display='flex' justifyContent='flex-end' >
                      <Button href={'#/' + jump} sx={{ color: 'white', marginTop: '4rem' }} disableRipple endIcon={<ChevronRightIcon />}>Learn More</Button>
                    </Box>
                  </Box>
                }
              </Box>
            </Box>
          </Box>


        </Grid>
      </Grid>
    </div >
  );
}

export default Home;