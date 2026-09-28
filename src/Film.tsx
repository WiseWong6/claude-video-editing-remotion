import React,{useEffect,useId,useState} from 'react';
import {AbsoluteFill,Audio,cancelRender,continueRender,delayRender,staticFile,useCurrentFrame} from 'remotion';
import {Art,ArtDefs} from './components/Artwork';
import {Arm,Box,GOLD,Heart,INK,Label,PAPER,Robot,Star} from './components/Drawing';
import {EditorRobot,Settings,Sidebar,State,Sticker,Timeline,Toolbar} from './components/Editor';
import {cameraAt,lerp,progress,seed,stateAt} from './timeline';

const Phone = ({s,x=535,y=68,w=200,h=300,final=false}: {s:State;x?:number;y?:number;w?:number;h?:number;final?:boolean}) => {
 const id=useId().replace(/:/g,'');
 const focus=s.t>5.4&&s.t<6.7&&!final;
 const turn=progress(s.t,10.05,10.7);
 const spinning=s.t>9.0&&s.t<9.45?progress(s.t,9,9.45)*360:0;
 const caption='前方高能预警'.slice(0,s.captionLength);
 return <g transform={`translate(${x} ${y}) scale(${w/210} ${h/314})`}>
  <Box x={0} y={0} w={210} h={314} r={26} fill="#2b2929" sw={2.8}/>
  <rect x="5" y="4" width="200" height="305" rx="24" fill="#373437" stroke="#6a6155" strokeWidth="1.1"/>
  <path d="M-2 59 v18 M-2 94 v23 M211 77 v36" stroke={INK} strokeWidth="2.7" strokeLinecap="round"/>
  <defs><clipPath id={id}><rect x="11" y="11" width="188" height="292" rx="19"/></clipPath></defs>
  <g clipPath={`url(#${id})`}>
   <svg x="11" y="11" width="188" height="292" viewBox="0 0 200 300" preserveAspectRatio="none">
    <g style={{filter:focus?'grayscale(1) blur(3px)':s.kind==='disco'?`saturate(${s.saturation})`:undefined}} transform={`rotate(${spinning} 100 150)`}>
      <Art kind={s.kind} t={s.t} punch={s.punch} flash={s.flash}/>
    </g>
    {s.t>10.05&&s.t<10.7&&<g><path d={`M200 ${300*(1-turn)} L${200*(1-turn)} 300 H200Z`} fill="#d2dfc8" stroke={INK} strokeWidth="1.3"/><path d={`M200 ${300*(1-turn)} Q${125-70*turn} ${260-140*turn} ${200*(1-turn)} 300Z`} fill="#fffceb" stroke="#787166" strokeWidth="1.2"/></g>}
    {s.t>11.15&&s.t<11.5&&Array.from({length:8},(_,i)=><rect key={i} x={i%2?0:18} y={i*40} width="200" height={9+i*2} fill={i%3?'#dfaec5':'#84cbbf'} opacity=".6"/>)}
    {focus&&<g><path d="M31 63 v-15 h20 M170 63 v-15 h-20 M31 165 v15 h20 M170 165 v15 h-20" fill="none" stroke={INK} strokeWidth="5"/><path d="M31 63 v-15 h20 M170 63 v-15 h-20 M31 165 v15 h20 M170 165 v15 h-20" fill="none" stroke="#fffef4" strokeWidth="3"/>
      <circle cx="100" cy="105" r="16" fill="none" stroke="#e2dfd1" strokeWidth="4" opacity=".6"/><path d="M100 89 a16 16 0 0 0 -13 25" fill="none" stroke="white" strokeWidth="4" transform={`rotate(${s.t*180} 100 105)`}/><Sticker x={100} y={149} text="对焦中.." size={21} fill="#fffdf4"/>
    </g>}
    {s.kind==='dog'&&s.t>12&&<Sticker x={99} y={final?223:221} text={final?'前方高能预警':caption} size={final?23:21}/>}
    {final&&<>
      <g fill="#fffcec" stroke={INK} strokeWidth="1.2">
        <circle cx="174" cy="49" r="14" fill="#d68065" stroke="#fff8ea" strokeWidth="2"/><ellipse cx="170" cy="48" rx="1.5" ry="3" fill={INK}/><ellipse cx="178" cy="48" rx="1.5" ry="3" fill={INK}/><circle cx="176" cy="64" r="5" fill="#ec747b" stroke="none"/>
        <Heart x={174} y={98} s={.7}/><rect x="164" y="133" width="21" height="14" rx="5" fill="#fffdf3"/><path d="M168 146 v5 l6 -5" fill="#fffdf3"/><path d="M169 139 h1 m4 0 h1 m4 0 h1" strokeWidth="2"/>
        <path d="M164 188 q3 -13 15 -15 v-5 l11 9 -11 9 v-5 q-9 -1 -15 7Z"/>
      </g>
      <Label x={175} y={119} size={10} fill="white" stroke={INK} strokeWidth={2} paintOrder="stroke" anchor="middle">{s.t<28.55?'9.7w':'10.2w'}</Label><Label x={175} y={163} size={10} fill="white" stroke={INK} strokeWidth={2} paintOrder="stroke" anchor="middle">2333</Label><Label x={175} y={201} size={10} fill="white" stroke={INK} strokeWidth={2} paintOrder="stroke" anchor="middle">分享</Label>
      {s.kind==='disco'&&<Sticker x={99} y={125} text="拿捏了!" size={35} rotate={-5}/>}
      {[0,1,2,3,4,5].map(i=><Star key={i} x={12+seed(i+860)*145} y={18+seed(i+670)*238} r={3+seed(i+860)*6} fill={i%2?GOLD:'#fffdf1'} opacity={.65+.35*Math.sin(s.t*5+i)}/>)}
      <Label x={11} y={269} size={12} fill="white" stroke={INK} strokeWidth={2} paintOrder="stroke" weight={700}>@小克 · Opus 5.5</Label><Label x={11} y={287} size={10} fill="white" stroke={INK} strokeWidth={1.5} paintOrder="stroke">#AI剪辑 #卡点 #code2video</Label>
    </>}
   </svg>
  </g>
  <rect x="85" y="17" width="39" height="11" rx="5.5" fill="#242324"/>
  {!final&&<g><Label x={75} y={336} size={14} fill="#7c7e72" anchor="middle">Ⅰ◀</Label><circle cx="106" cy="331" r="10" fill="none" stroke="#7c7e72" strokeWidth="1.5"/><Label x={106} y={336} size={14} fill="#7c7e72" anchor="middle">{s.t>5?'Ⅱ':'▶'}</Label><Label x={137} y={336} size={14} fill="#7c7e72" anchor="middle">▶Ⅰ</Label></g>}
 </g>;
};

const Ending = ({s}: {s:State}) => {
 const p=s.ending;
 return <g>
  <Phone s={s} x={lerp(535,450,p)} y={lerp(68,130,p)} w={lerp(200,300,p)} h={lerp(300,464,p)} final={p>.5}/>
  <g opacity={progress(s.t,26.4,26.85)} transform={`translate(${lerp(-50,0,progress(s.t,26.4,26.85))} 0) rotate(-1.4 222 330)`}>
    <Box x={47} y={166} w={362} h={322} fill="#fffefa" r={9} sw={2.1}/>
    {Array.from({length:7},(_,i)=><path key={i} d={`M61 ${227+i*42} H390`} stroke="#e6e3db" strokeWidth="1"/>)}
    <path d="M181 159 H274 L273 181 H179Z" fill={GOLD} opacity=".74"/><path d="M186 162 H269" stroke="#e1bd54" opacity=".6" strokeWidth="2"/>
    <Label x={73} y={248} size={34} fill="#666760">{'30 秒剪完，'.slice(0,Math.floor(progress(s.t,26.8,27.75)*8))}</Label>
    <g opacity={progress(s.t,28.35,28.75)}><Label x={77} y={359} size={65} fill="#282925" fontStyle="italic">Opus 5.5</Label><path d="M72 387 Q229 365 380 382" fill="none" stroke="#cd7864" strokeWidth="5.5" strokeLinecap="round" pathLength="1" strokeDasharray="1" strokeDashoffset={1-progress(s.t,28.6,29.05)}/></g>
    <g opacity={progress(s.t,29,29.35)}><Label x={174} y={452} size={30} fill="#78786e">— 小克 收工</Label><Star x={374} y={438} r={12} fill={GOLD}/></g>
  </g>
  <g opacity={p}>
   {s.t>28.5&&<Arm x1={1078} y1={518} x2={1099+Math.sin(s.t*12)*5} y2={478}/>}
   <Robot x={966} y={482} s={1.2} t={s.t} glasses mood={s.t>28.7?'wink':'happy'}/>
   {s.t>28.5&&<Star x={1120} y={474} r={7} fill={GOLD}/>}
  </g>
  <g opacity={progress(s.t,26.3,26.7)}>{Array.from({length:35},(_,i)=>{const x=310+seed(i+800)*940,y=((s.t-26)*(24+seed(i+500)*47)+seed(i+800)*560)%740-25;return <rect key={i} x={x} y={y} width={3+seed(i)*5} height="4" transform={`rotate(${s.t*50+i*21} ${x} ${y})`} fill={['#e5c667','#94b5ab','#b4a7d0','#df978b'][i%4]} stroke={INK} strokeWidth=".65"/>;})}</g>
 </g>;
};

export type FilmProps = {audioSrc?:string};
export const Film = ({audioSrc}: FilmProps) => {
 const frame=useCurrentFrame();
 const s=stateAt(frame),camera=cameraAt(frame);
 const [fontHandle]=useState(()=>delayRender('等待本地手写字体'));
 useEffect(()=>{document.fonts.load('20px Wenkai').then(()=>continueRender(fontHandle)).catch(cancelRender);},[fontHandle]);
 const draw=progress(s.t,.35,1.5);
 return <AbsoluteFill style={{backgroundColor:PAPER}}>
  <Audio src={audioSrc??staticFile('soundtrack.m4a')}/>
  <svg width="1280" height="720" viewBox="0 0 1280 720" xmlns="http://www.w3.org/2000/svg" style={{fontFamily:'Wenkai, cursive'}}>
   <ArtDefs/>
   <rect width="1280" height="720" fill={PAPER}/>
   <g transform={`translate(${camera.x} ${camera.y}) scale(${camera.zoom})`}>
    <g opacity={1-s.ending*.73}>
      <Box x={1} y={1} w={1278} h={718} fill={PAPER} r={16} sw={2.3}/>
      <g opacity={progress(s.t,0,.25)}><Toolbar s={s}/></g>
      {s.t<1.9&&<g><rect x="26" y="66" width="254" height="314" rx="12" fill="#eee9df" opacity={draw*.7}/><rect x="26" y="66" width="254" height="314" rx="12" fill="none" stroke={INK} strokeWidth="2.5" pathLength="1" strokeDasharray="1" strokeDashoffset={1-draw}/>
      <g transform={`translate(${s.t<1?lerp(45,280,progress(s.t,.35,.95)):280} ${s.t<1?66:lerp(66,375,progress(s.t,1,1.5))}) rotate(-28)`}><path d="M0 0 h22 v7 H0 l-7 -3.5Z" fill={GOLD} stroke={INK} strokeWidth="1.4"/><path d="M18 0 h5 v7 h-5" fill="#d58d9b" stroke={INK}/></g></g>}
      <g opacity={progress(s.t,1.4,1.95)}><Sidebar s={s}/><Settings s={s}/><Timeline s={s}/></g>
      {s.ending===0&&<g opacity={progress(s.t,1.65,2.05)}><Phone s={s}/></g>}
      <EditorRobot s={s}/>
    </g>
   </g>
   {s.ending>0&&<Ending s={s}/>}
   <rect width="1280" height="720" fill="url(#paper-grain)" pointerEvents="none" opacity=".52"/>
  </svg>
 </AbsoluteFill>;
};
