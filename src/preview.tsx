import React,{useEffect,useMemo,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Player,PlayerRef,CallbackListener} from '@remotion/player';
import {Film} from './Film';
import {DURATION,FPS,FRAMES,HEIGHT,WIDTH} from './timeline';
import './font.css';
import './preview.css';

const clock=(seconds:number)=>`${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(Math.floor(seconds%60)).padStart(2,'0')}`;
const App=()=>{
 const player=useRef<PlayerRef>(null);
 const controls=useRef<HTMLDivElement>(null);
 const [frame,setFrame]=useState(0);
 const [autoplay]=useState(!matchMedia('(prefers-reduced-motion: reduce)').matches);
 const [playing,setPlaying]=useState(autoplay);
 const playingRef=useRef(playing);
 playingRef.current=playing;
 const [rate,setRate]=useState(1);
 const [sound,setSound]=useState(false);
 const [dragging,setDragging]=useState(false);
 const [near,setNear]=useState(true);
 const dragWasPlaying=useRef(false),hiddenWasPlaying=useRef(false);
 const inputProps=useMemo(()=>({audioSrc:'./assets/soundtrack.m4a'}),[]);

 useEffect(()=>{
  const p=player.current!;
  const onFrame:CallbackListener<'frameupdate'>=(event)=>setFrame(event.detail.frame);
  const onPlay=()=>setPlaying(true),onPause=()=>setPlaying(false);
  p.addEventListener('frameupdate',onFrame);p.addEventListener('play',onPlay);p.addEventListener('pause',onPause);p.addEventListener('ended',onPause);
  const onVisibility=()=>{
   if(document.hidden){hiddenWasPlaying.current=playingRef.current;player.current?.pause();player.current?.mute();}
   else if(hiddenWasPlaying.current){hiddenWasPlaying.current=false;player.current?.play();}
  };
  const onSpace=(e:KeyboardEvent)=>{
   if(e.code==='Space'&&!(e.target instanceof HTMLElement&&e.target.closest('button,input,select,textarea,[contenteditable]'))){e.preventDefault();if(playingRef.current)player.current?.pause();else player.current?.play();}
  };
  document.addEventListener('visibilitychange',onVisibility);window.addEventListener('keydown',onSpace);
  return()=>{p.removeEventListener('frameupdate',onFrame);p.removeEventListener('play',onPlay);p.removeEventListener('pause',onPause);p.removeEventListener('ended',onPause);document.removeEventListener('visibilitychange',onVisibility);window.removeEventListener('keydown',onSpace);};
 },[]);
 useEffect(()=>{const p=player.current;if(!p)return;if(sound&&playing&&!dragging&&!document.hidden)p.unmute();else p.mute();},[sound,playing,dragging]);
 useEffect(()=>{
  const reveal=(e:PointerEvent)=>{
   if(e.pointerType==='touch'){setNear(true);return;}
   const box=controls.current?.getBoundingClientRect();
   if(box)setNear(e.clientY>=box.top-70);
  };
  window.addEventListener('pointermove',reveal);
  return()=>window.removeEventListener('pointermove',reveal);
 },[]);
 const finishDrag=()=>{if(!dragging)return;setDragging(false);if(dragWasPlaying.current)player.current?.play();};
 const elapsed=frame===FRAMES-1?DURATION:frame/FPS;
 return <>
  <main><Player ref={player} component={Film} inputProps={inputProps} compositionWidth={WIDTH} compositionHeight={HEIGHT} durationInFrames={FRAMES} fps={FPS} style={{width:'100%'}} controls={false} autoPlay={autoplay} initiallyMuted loop={false} playbackRate={rate} numberOfSharedAudioTags={0} clickToPlay={false} doubleClickToFullscreen={false} spaceKeyToPlayOrPause={false} moveToBeginningWhenEnded={false}/></main>
  <div ref={controls} className={`playback${!near&&!dragging?' is-hidden':''}`} role="group" aria-label="播放控制">
   <button id="play-toggle" onClick={event=>{if(playing){player.current?.pause();}else{if(frame===FRAMES-1)player.current?.seekTo(0);player.current?.play(event);}}}>{playing?'暂停':'播放'}</button>
   <input id="play-progress" type="range" aria-label="播放进度" aria-valuetext={`${clock(elapsed)}，共 ${clock(DURATION)}`} min="0" max={FRAMES-1} step="1" value={frame} style={{'--progress':`${frame/(FRAMES-1)*100}%`} as React.CSSProperties}
    onPointerDown={e=>{dragWasPlaying.current=playingRef.current;setDragging(true);player.current?.pause();player.current?.mute();e.currentTarget.setPointerCapture(e.pointerId);}}
    onChange={e=>{const f=Number(e.target.value);setFrame(f);player.current?.seekTo(f);}}
    onPointerUp={finishDrag} onPointerCancel={finishDrag} onLostPointerCapture={finishDrag}/>
   <button id="play-restart" onClick={()=>{player.current?.seekTo(0);player.current?.play();}}>重播</button>
   <button id="play-speed" aria-label={`播放速度 ${rate} 倍，点击切换`} onClick={()=>{const rates=[.5,1,1.5,2,3];setRate(rates[(rates.indexOf(rate)+1)%rates.length]);}}>{rate}×</button>
   <button id="play-sound" aria-pressed={sound} onClick={()=>setSound(!sound)}>{sound?'声音开':'声音关'}</button>
   <output id="play-time" aria-live="off">{clock(elapsed/rate)} / {clock(DURATION/rate)}</output>
  </div>
 </>;
};
createRoot(document.getElementById('root')!).render(<App/>);
