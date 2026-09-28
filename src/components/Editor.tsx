import React from 'react';
import {ArtTile} from './Artwork';
import {Arm,Box,GOLD,INK,Label,PAPER,RED,Robot,Star,TEAL} from './Drawing';
import {clamp,ClipKind,lerp,progress,seed,stateAt} from '../timeline';
export type State = ReturnType<typeof stateAt>;

export const Sticker = ({x,y,text,size=30,fill=GOLD,rotate=0}: {x:number;y:number;text:string;size?:number;fill?:string;rotate?:number}) => <g transform={`rotate(${rotate} ${x} ${y})`}><Label x={x+1} y={y+3} size={size} anchor="middle" fill={INK} stroke={INK} strokeWidth={7} strokeLinejoin="round" weight={700}>{text}</Label><Label x={x} y={y} size={size} anchor="middle" fill={fill} stroke={INK} strokeWidth={4} paintOrder="stroke" strokeLinejoin="round" weight={700}>{text}</Label></g>;

export const Toolbar = ({s}: {s:State}) => {
 const sec=Math.floor(s.t),frames=Math.floor((s.t-sec)*30);
 return <g><Box x={26} y={14} w={1228} h={42} fill="#fcfaf4" r={10}/>
  {['#de8587','#edcf77','#94be99'].map((c,i)=><circle key={c} cx={44+i*16} cy="34" r="4.6" fill={c} stroke={INK} strokeWidth="1"/>)}
  <Robot x={95} y={27} s={.19} mood="focus"/>
  <path d="M96 25 l17 -4 m-15 -1 v-4 m6 3 v-5 m6 4 v-5" stroke={INK} strokeWidth="2"/>
  <Label x={127} y={40} size={21}>小克剪辑_最终版_打死不改(3).mp4</Label>
  <Box x={566} y={18} w={148} h={33} fill="#393730" r={7}/>
  <Label x={640} y={40} anchor="middle" size={20} fill="#f7f0e4">00:00:{String(sec).padStart(2,'0')}:{String(frames).padStart(2,'0')}</Label>
  <Label x={737} y={39} size={13} fill="#969387">· 已自动保存</Label>
  <Box x={990} y={21} w={61} h={27} fill="#efeadc" r={7} sw={1.6}/><Label x={1020} y={39} anchor="middle" size={15}>1080p</Label>
  <Box x={1064} y={18} w={176} h={33} fill={s.t<24?TEAL:s.t<25.8?GOLD:'#9ec5aa'} r={8}/>
  <Label x={1152} y={41} anchor="middle" size={18} fill={s.t<24?'white':INK} weight={700}>{s.t<24?'↥ 导出':s.t<25.8?`渲染中 ${Math.round(s.exportProgress*99)}%`:'完成 ✓'}</Label>
 </g>;
};

export const TransitionIcon = ({index,x,y,s=1}: {index:number;x:number;y:number;s?:number}) => <g transform={`translate(${x} ${y}) scale(${s})`} stroke={INK} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
 {index===0?<><path d="M9 -16 C-10 -24 -24 1 -10 14 C5 29 26 7 14 -6 C3 -19 -11 -3 -1 6 C8 15 14 0 6 -3 C0 -6 -3 2 2 3" fill="none" stroke={TEAL} strokeWidth="8"/><path d="M9 -16 C-10 -24 -24 1 -10 14 C5 29 26 7 14 -6 C3 -19 -11 -3 -1 6 C8 15 14 0 6 -3 C0 -6 -3 2 2 3" fill="none"/><path d="M3 -20 l10 -1 -2 11" fill={TEAL}/></>:index===1?<><path d="M-13 -17 L15 -18 L14 17 L-13 16Z" fill="#fffef5"/><path d="M-7 -11 H9 M-7 -4 H9 M-7 3 H6 M-7 10 H1"/><path d="M14 4 L3 16 L4 5Z" fill="#e4decc"/></>:index===2?<><rect x="-16" y="-12" width="32" height="25" rx="5" fill="#a9a3d1"/><path d="M-20 -6 v10 m40 -11 v7 M-8 -12 h8 m-3 25 h9" stroke="#9dc7d2" strokeWidth="4"/><path d="M-8 -3 v3 m13 -3 v3 m-10 6 h7"/></>:index===3?<><circle cx="-3" cy="-4" r="13" fill="#e8f3f4"/><path d="M6 7 l16 16" stroke={RED} strokeWidth="9"/><path d="M-3 -10 v12 m-6 -6 h12"/></>:index===4?<><rect x="-12" y="-14" width="27" height="29" rx="3" fill={TEAL}/><path d="M-1 -7 l8 8 -8 7" fill="none" stroke="white" strokeWidth="4"/><path d="M-25 -9 h8 m-10 8 h10 m-8 8 h7"/></>:<><rect x="-13" y="-14" width="26" height="27" fill="#a99acd"/>{Array.from({length:9},(_,i)=><rect key={i} x={10+(i%3)*5} y={8+Math.floor(i/3)*5} width="3" height="3" fill={i%2?'#aca1cc':'#d6d1e1'} stroke="none"/>)}</>}
 </g>;

export const Sidebar = ({s}: {s:State}) => <g>
 <Box x={26} y={66} w={254} h={314} fill="#faf7ef"/>
 {['素材','转场','文字'].map((word,i)=><g key={word}><Box x={38+i*80} y={76} w={73} h={25} r={5} fill={s.tab===i?GOLD:'#f0ece2'} sw={1.5}/><Label x={74+i*80} y={94} anchor="middle" size={16} fill={s.tab===i?INK:'#989285'}>{word}</Label></g>)}
 {s.tab===0?<>
 {(['night','ramen','dog','disco'] as ClipKind[]).map((kind,i)=>{const x=39+(i%2)*123,y=112+Math.floor(i/2)*99;return <g key={kind}>
  <Box x={x} y={y} w={109} h={67} fill="white" r={6}/><ArtTile x={x+2} y={y+2} w={105} h={63} kind={kind}/>
  <rect x={x+78} y={y+49} width="28" height="16" rx="4" fill="#302d2788"/><Label x={x+92} y={y+61} size={11} fill="white" anchor="middle">{[2.4,4.6,2.4,2.8][i]}s</Label>
  <Label x={x+54} y={y+84} size={14} anchor="middle">{['夜景.mp4','拉面.mp4','柴犬.mov','小克蹦迪.mp4'][i]}</Label>
  {s.t>2+i*.57&&s.t<2.5+i*.57&&<rect x={x-4} y={y-4} width="117" height="75" rx="8" fill="none" stroke={GOLD} strokeWidth="3"/>}
 </g>;})}
 {[0,1].map(i=><g key={i}><rect x={39+i*123} y="309" width="109" height="48" rx="6" fill="none" stroke="#c3bcaf" strokeWidth="1.5" strokeDasharray="5 5"/><Label x={93+i*123} y={341} anchor="middle" size={30} fill="#a9a596">＋</Label><Label x={93+i*123} y={373} anchor="middle" size={13} fill="#aaa596">导入素材</Label></g>)}
 </>:s.tab===1?<>
 {['旋转','翻页','故障','缩放','滑动','溶解'].map((name,i)=>{const x=40+(i%2)*122,y=113+Math.floor(i/2)*85;return <g key={name}>
 <Box x={x} y={y} w={108} h={62} r={5} fill={['#c9c3df','#d6eee0','#f5d8e1','#d6eaf3','#f7e8bc','#eee8db'][i]} sw={1.7}/><TransitionIcon index={i} x={x+54} y={y+31} s={.72}/><Label x={x+54} y={y+77} anchor="middle" size={14}>{name}</Label>
 </g>;})}
 </>:<>
 {['#fff3d2','#fbe5ee','#31283e'].map((color,i)=><g key={color}><Box x={40} y={112+i*85} w={226} h={76} fill={color} sw={1.7}/><Label x={49} y={128+i*85} size={10} fill={i===2?'#d0b3d3':'#b2ab98'}>{['爆款','气泡','霓虹'][i]}</Label>
 {i===0?<Sticker x={153} y={161} text="前方高能" size={26}/>:i===1?<><Box x={91} y={220} w={122} h={34} r={16} fill="#fffafd" stroke="#d58b9e" sw={1.8}/><Label x={152} y={245} size={25} anchor="middle" fill="#d2809b" weight={700}>好耶～</Label></>:<><Label x={153} y={330} size={24} anchor="middle" fill="#c999e6" stroke="#bb8cc9" strokeWidth="7" opacity=".28">霓虹 NEON</Label><Label x={153} y={330} size={24} anchor="middle" fill="#fff5ff" weight={700}>霓虹 NEON</Label></>}
 </g>)}
 </>}
</g>;

export const Settings = ({s}: {s:State}) => <g><Box x={1000} y={66} w={254} h={314} fill="#faf7ef"/>
 <Label x={1015} y={94} size={21}>调整</Label><Star x={1075} y={87} r={8} fill={GOLD}/><path d="M1016 111 H1240" stroke="#aaa79c" strokeWidth="1"/>
 {['闪光','饱和度','缩放冲击','速度'].map((name,i)=>{const v=[s.flash,s.saturation/3,s.punch,.5][i];const y=155+i*60;return <g key={name}>
 <Label x={1016} y={y-21} size={17}>{name}</Label><Label x={1238} y={y-21} size={14} anchor="end" fill="#77786e">{[`${Math.round(s.flash*100)}%`,`${Math.round(s.saturation*100)}%`,`${Math.round(s.punch*100)}%`,'1.0x'][i]}</Label>
 <rect x="1018" y={y-3} width="215" height="7" rx="3.5" fill="#e2e0d6" stroke={INK} strokeWidth="1.3"/><rect x="1018" y={y-2} width={215*v} height="5" rx="2.5" fill={TEAL}/>
 <circle cx={1018+215*v} cy={y} r="9" fill="#fffdf6" stroke={INK} strokeWidth="1.8"/><circle cx={1018+215*v} cy={y} r="1.4" fill="#8b8b7f"/>
 </g>;})}
</g>;

const clipLabel = (kind:ClipKind) => ({night:'夜景.mp4',ramen:'拉面.mp4',dog:'柴犬.mov',disco:'小克蹦迪.mp4'}[kind]);
export const Timeline = ({s}: {s:State}) => {
 const widths=[163,313-s.cut*123,163,191];
 let cx=96;
 const starts=widths.map(w=>{const x=cx;cx+=w+3;return x;});
 return <g>
  <Box x={26} y={392} w={1228} h={310} fill="#faf8f0"/>
  <path d="M96 433 H1238" stroke="#55564c" strokeWidth="1.3"/>
  {Array.from({length:65},(_,i)=><g key={i}><path d={`M${96+i*17} 433 v${i%4===0?-17:-7}`} stroke="#a7a496" strokeWidth="1"/>{i%8===0&&<Label x={96+i*17} y={413} size={13} fill="#77796e" anchor="middle">0:{String(i/4).padStart(2,'0')}</Label>}</g>)}
  <rect x="95" y="441" width="1144" height="29" rx="4" fill="#eeece4"/>
  <rect x="95" y="481" width="1144" height="70" rx="4" fill="#edeae3"/>
  <rect x="95" y="563" width="1144" height="45" rx="4" fill="#efede7"/>
  {[{y:442,h:28,c:'#faf0ce',v:'T'},{y:481,h:68,c:'#d7eee3',v:'▶'},{y:563,h:41,c:'#e4dff0',v:'♪'}].map(row=><g key={row.y}><Box x={38} y={row.y} w={39} h={row.h} fill={row.c} r={5} sw={1.8}/><Label x={57} y={row.y+row.h/2+8} size={row.v==='♪'?28:21} anchor="middle">{row.v}</Label></g>)}
  {(['night','ramen','dog','disco'] as ClipKind[]).map((kind,i)=> s.t<2.45+i*.62?null:<g key={kind} opacity={progress(s.t,2.45+i*.62,2.58+i*.62)}>
    <Box x={starts[i]} y={482} w={widths[i]} h={67} fill={['#8580b4',GOLD,'#99d5c2','#d18bae'][i]} r={5} sw={2}/>
    {Array.from({length:i===1?4:3},(_,k)=><ArtTile key={k} x={starts[i]+2+k*(widths[i]-4)/(i===1?4:3)} y={484} w={(widths[i]-4)/(i===1?4:3)} h={63} kind={kind}/>)}
    <rect x={starts[i]+5} y="486" width={kind==='disco'?88:60} height="16" rx="7" fill="#fffdf5" stroke="#999182" strokeWidth=".7"/><Label x={starts[i]+11} y={498} size={11}>{clipLabel(kind)}</Label>
  </g>)}
  {s.t>4.5&&<g opacity={progress(s.t,4.5,4.8)}><Box x={96} y={565} w={1136} h={38} fill="#eae3f5" r={5} sw={1.6}/><Label x={104} y={578} size={11}>♪ bgm_小克.wav</Label>
  {Array.from({length:345},(_,i)=>{const a=(4+seed(i+90)*18)*(i<40?.3:1);return <path key={i} d={`M${100+i*3.27} ${586-a/2} v${a}`} stroke="#a195c5" strokeWidth="1.4"/>;})}</g>}
  {s.t>5.25&&s.t<7.85&&<g opacity={1-s.cut}><rect x={starts[1]+119} y="484" width={123*(1-s.cut)} height="63" fill="#8f8b80" opacity=".78"/><rect x={starts[1]+119} y="484" width={123*(1-s.cut)} height="63" fill="url(#hatch)"/><Label x={starts[1]+165} y={522} size={29} fill="#ccc7b9">z z</Label></g>}
  {s.t>7.7&&<path d={`M${starts[1]+119} 483 V549`} stroke={INK} strokeWidth="2.5"/>}
  {s.t>8.9&&[0,1,2].map(i=>s.t<[9.05,10.45,11.15][i]?null:<g key={i}><circle cx={starts[i+1]} cy="519" r="14" fill="#fffdf4" stroke={INK} strokeWidth="1.8"/><TransitionIcon index={i} x={starts[i+1]} y={519} s={.48}/></g>)}
  {s.t>12.05&&<g><Box x={starts[2]+3} y={443} w={163} h={26} fill={GOLD} r={5} sw={1.5}/><Label x={starts[2]+10} y={461} size={13}>T {'前方高能预警'.slice(0,s.captionLength)}</Label></g>}
  <path d={`M${96+s.editingPosition*68} 405 V624`} stroke="#e4637c" strokeWidth="2.3"/><path d={`M${89+s.editingPosition*68} 402 h14 v11 l-7 7 -7 -7Z`} fill="#e5687c" stroke={INK} strokeWidth="1.5"/>
  {s.t>21&&<g opacity={progress(s.t,21,21.5)}>{Array.from({length:33},(_,i)=><path key={i} d={`M${97+i*34} 615 l6 12 6 -12Z`} fill={GOLD} stroke={INK} strokeWidth="1"/>)}<Box x={1140} y={566} w={98} h={36} fill={GOLD} r={6}/><Label x={1187} y={591} anchor="middle" size={18}>▽ 卡点</Label></g>}
  <path d="M50 676 h7 m10 0 h86 m14 -4 v8 m-4 -4 h8" stroke="#b6b3a8" strokeWidth="1.2"/><circle cx="107" cy="676" r="4" fill="#fffdf9" stroke="#b6b3a8"/>
  <Label x={1230} y={678} size={11} fill="#c5c0b4" anchor="end">片段 4 · 总时长 0:{(12.2-s.cut*1.8).toFixed(1)}</Label>
 </g>;
};

export const EditorRobot = ({s}: {s:State}) => {
 const t=s.t;
 let x=146,y=422;
 if(t>=15.4&&t<20.5){x=lerp(146,458,progress(t,15.4,15.8));y=438;}
 if(t>=20.5&&t<23.5){x=lerp(455,674,progress(t,20.5,23.5));y=507-9*Math.abs(Math.sin(t*8));}
 if(t>=23.5){x=lerp(674,950,progress(t,23.5,24.15));y=493;}
 const sx=x+75,sy=y+29;
 let target: [number,number]|null=null;
 if(t>=2.0&&t<4.75){const i=clamp(Math.floor((t-2)/.62),0,3);const p=((t-2)/.62)%1;target=[lerp(90+(i%2)*123,160+i*180,progress(p,.35,.9)),lerp(145+Math.floor(i/2)*100,505,progress(p,.35,.9))];}
 if(t>=6.4&&t<7.5) target=[lerp(380,511,progress(t,6.4,6.8)),565];
 if(t>=8.4&&t<9.5){const p=progress(t,8.75,9.3);target=[lerp(94,261,p),lerp(144,520,p)];}
 if(t>=9.6&&t<10.7){const p=progress(t,10,10.5);target=[lerp(216,454,p),lerp(144,520,p)];}
 if(t>=10.75&&t<11.6){const p=progress(t,11,11.45);target=[lerp(94,620,p),lerp(230,520,p)];}
 if(t>=15.6&&t<16.8)target=[1018+215*s.flash,155];
 if(t>=16.8&&t<18.2)target=[1018+215*s.saturation/3,215];
 if(t>=18.2&&t<19.7)target=[1018+215*s.punch,275];
 if(t>=23.65&&t<24.2)target=[1150,35];
 return <g opacity={progress(t,1.9,2.15)*(1-s.ending)}>
  {target&&<Arm x1={sx} y1={sy} x2={target[0]} y2={target[1]}/>}
  {t>=2&&t<4.48&&target&&<g transform={`rotate(${Math.sin(t*7)*8} ${target[0]} ${target[1]})`}><Box x={target[0]-36} y={target[1]-20} w={72} h={43} r={3} fill={GOLD} sw={1.5}/><ArtTile x={target[0]-34} y={target[1]-18} w={68} h={39} kind={(['night','ramen','dog','disco'] as ClipKind[])[clamp(Math.floor((t-2)/.62),0,3)]}/></g>}
  {t>8.4&&t<11.6&&target&&<g><circle cx={target[0]} cy={target[1]} r="19" fill="#fffdf2" stroke={INK} strokeWidth="1.7"/><TransitionIcon index={t<9.5?0:t<10.7?1:2} x={target[0]} y={target[1]} s={.65}/></g>}
  {t>=15.6&&t<19.7&&target&&<circle cx={target[0]} cy={target[1]} r="13" fill="none" stroke={GOLD} strokeWidth="4" opacity=".8"/>}
  <Robot x={x} y={y} s={.77} t={t} mood={t<5?'wink':t<7.8?'sleep':t<15.6?'focus':'happy'} glasses={t>20.2}/>
  {t>5.4&&t<6.45&&<g transform={`translate(380 440) scale(${progress(t,5.4,5.65)})`}><path d="M0 -40 H155 Q163 -40 163 -31 V-11 Q163 -4 151 -4 H87 L79 8 69 -4 H0 Q-8 -4 -8 -14 V-30 Q-8 -40 0 -40Z" fill="#fffdf5" stroke={INK} strokeWidth="2"/><Label x={76} y={-15} size={18} anchor="middle">这段在发呆 zzz</Label></g>}
  {t>6.5&&t<7.4&&<><Sticker x={470} y={408} text="唰!" fill="#e6a0b8" size={34} rotate={-10}/><path d="M507 505 Q541 529 507 568 Q521 537 507 505Z" fill="#fffdeb" stroke={INK} strokeWidth="1.5"/></>}
  {t>13.7&&t<14.45&&<g transform={`translate(${x-25} ${y+35})`}><Box x={0} y={0} w={124} h={68} r={10} fill="#d4d0c1"/><Box x={7} y={5} w={110} h={55} r={8} fill="#fffdf2"/><Label x={61} y={41} size={26} anchor="middle" weight={700}>Ctrl+Z</Label></g>}
  {t>14.5&&t<15.5&&<g transform="translate(830 210) rotate(-12)"><rect x="-55" y="-25" width="120" height="43" rx="4" fill="none" stroke="#7f9e77" strokeWidth="3"/><rect x="-50" y="-20" width="110" height="33" rx="3" fill="none" stroke="#7f9e77"/><Label x={5} y={6} anchor="middle" size={25} fill="#7f9e77" weight={700}>已修正</Label></g>}
  {t>21&&t<22.8&&<Sticker x={250} y={444} text="卡点!" fill={TEAL} size={35} rotate={-7}/>}
 </g>;
};
