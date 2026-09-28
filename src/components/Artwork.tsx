import React,{useId} from 'react';
import {ClipKind, seed} from '../timeline';
import {Heart, INK, Label, Robot, Star} from './Drawing';

const Night = ({t,small}: {t:number;small:boolean}) => <>
  <rect width="200" height="300" fill="url(#night-sky)"/>
  {Array.from({length:small?16:35},(_,i)=> <circle key={i} cx={seed(i+20)*198} cy={seed(i+30)*205} r={i%4===0?1.3:.6} fill="#f8efc5" opacity={.5+.4*Math.sin(t*2+i)}/>)}
  <circle cx="145" cy="77" r="35" fill="#eed47c" opacity=".055"/>
  <path transform={`rotate(${Math.sin(t)*3} 142 76)`} d="M150 45 C126 48 121 76 142 87 C153 94 167 90 172 85 C150 87 138 64 150 45Z" fill="#efd168" stroke={INK} strokeWidth="2"/>
  {[0,1].map(layer=><g key={layer}>
    {Array.from({length:layer?9:12},(_,i)=>{const w=layer?27:20,x=i*(layer?25:19)-6,y=(layer?201:167)+seed(i+layer*12)*32;return <g key={i}>
      <path d={`M${x} 304 V${y} H${x+w} V304Z`} fill={layer?'#292b52':'#41416c'} stroke="#252638" strokeWidth="1.7"/>
      {i%3===0&&<path d={`M${x+7} ${y} v-8 h9 v8`} fill="#41416c" stroke="#252638" strokeWidth="1.3"/>}
      {Array.from({length:small?8:21},(_,j)=><rect key={j} x={x+5+(j%3)*7} y={y+8+Math.floor(j/3)*13} width="3.5" height="6" fill={seed(i*53+j+layer*399)>.43?'#e0ce70':'#535577'} opacity=".95"/>)}
    </g>;})}
  </g>)}
  {!small&&<><Star x={43} y={109} r={4}/><Star x={125} y={156} r={5}/></>}
</>;

const Ramen = ({t,small}: {t:number;small:boolean}) => <>
  <rect width="200" height="300" fill="url(#ramen-bg)"/>
  <path d="M0 219 H200 V300 H0Z" fill="#e4b277"/>
  <path d="M0 219 H200 M0 264 Q110 261 200 265 M0 290 H200" stroke="#8c6240" strokeWidth="1.8" fill="none"/>
  {!small&&<>{[0,1,2,3].map((i)=><g key={i}><path d={`M${7+i*48} 0 V49 H${52+i*48} V0Z`} fill="#404c84" stroke={INK} strokeWidth="1.5"/><Label x={30+i*48} y={34} size={26} fill="white" anchor="middle" weight={700}>{['●','拉','面','●'][i]}</Label></g>)}</>}
  <ellipse cx="101" cy="255" rx="72" ry="7" fill="#ac8153" opacity=".17"/>
  <path d="M20 190 Q27 260 99 256 Q168 258 179 190Z" fill="#fff9e4" stroke={INK} strokeWidth="2.8"/>
  <path d="M24 207 Q103 242 175 208 L167 228 Q104 257 32 226Z" fill="#d46a70"/>
  {Array.from({length:12},(_,i)=>{const x=30+i*11.5, y=213+11*Math.sin((i/11)*Math.PI);return <path key={i} d={`M${x} ${y} h8 v8 h-5 v-5 h3 m-6 7 h10`} fill="none" stroke="#fff4df" strokeWidth="1.6"/>;})}
  <path d="M74 254 v6 h55 v-6" fill="#fff9e4" stroke={INK} strokeWidth="2"/>
  <ellipse cx="100" cy="190" rx="80" ry="27" fill="#fff5de" stroke={INK} strokeWidth="2.8"/>
  <ellipse cx="100" cy="189" rx="70" ry="21" fill="#5b4530" stroke={INK} strokeWidth="1.5"/>
  {Array.from({length:10},(_,i)=><path key={i} d={`M${38+i*12} 184 q-10 8 3 12 t-3 7`} fill="none" stroke="#edcb76" strokeWidth="2"/>)}
  <g transform="rotate(-12 67 183)"><ellipse cx="67" cy="183" rx="19" ry="12" fill="#ebaaa2" stroke={INK} strokeWidth="1.4"/><ellipse cx="67" cy="183" rx="14" ry="8" fill="#b76768" stroke="#f7d7b5" strokeWidth="2"/></g>
  <g transform="rotate(11 136 168)"><path d="M123 191 V158 H150 V187Z" fill="#2e4c3d" stroke={INK} strokeWidth="1.5"/><path d="M127 164 h18 m-18 6 h18 m-18 6 h18 m-18 6 h18 m-14 -22 v27 m6 -26 v27" stroke="#91a084" strokeWidth="1" opacity=".6"/></g>
  <ellipse cx="55" cy="200" rx="15" ry="10" fill="#fff9e8" stroke={INK} strokeWidth="1.3"/><ellipse cx="55" cy="200" rx="8" ry="6" fill="#edc55b"/>
  <g transform="rotate(15 145 200)"><ellipse cx="145" cy="200" rx="13" ry="10" fill="#fff5de" stroke={INK}/><path d="M146 198 c-8 -5 -11 6 -3 6 c7 0 6 -10 -2 -9" fill="none" stroke="#dc8c9b" strokeWidth="2"/></g>
  {Array.from({length:7},(_,i)=><ellipse key={i} cx={72+i*8} cy={198+Math.sin(i*2)*7} rx="5" ry="2.2" fill="#88a067" stroke="#304a32" strokeWidth=".8"/>)}
  {Array.from({length:8},(_,i)=><path key={i} d={`M${100+i*.8} ${121+Math.sin(t*2)*5} C${94+i*2} 151 ${97+i*2} 177 ${84+i*4} 192`} fill="none" stroke="#f9e7a3" strokeWidth="1.8"/>)}
  <path d={`M${103} ${121+Math.sin(t*2)*5} L199 40 L202 43Z M106 ${126+Math.sin(t*2)*5} L201 53 L203 57Z`} fill="#e5c08a" stroke={INK} strokeWidth="1.5"/>
  {!small&&[0,1,2].map(i=><path key={i} d={`M${70+i*24} ${152-i*7} q-12 -12 0 -26 t2 -20`} transform={`translate(0 ${Math.sin(t*3+i)*4})`} stroke="#fff8da" strokeWidth="3" fill="none" opacity={.4+.2*Math.sin(t*2+i)}/>)}
</>;

const Dog = ({t,small}: {t:number;small:boolean}) => <>
  <rect width="200" height="300" fill="#bce9db"/>
  {!small&&Array.from({length:40},(_,i)=><circle key={i} cx={seed(i+12)*200} cy={seed(i+20)*300} r={2.5} fill="#eaffed" opacity=".25"/>)}
  <g transform={`rotate(${Math.sin(t*4)*3} 100 213)`}>
    <path d="M127 225 Q181 167 190 197 Q204 235 158 232" fill="#d9904a" stroke={INK} strokeWidth="2"/><ellipse cx="182" cy="202" rx="6" ry="4" fill="#fff8e6"/>
    <path d="M24 300 L24 249 Q27 208 87 211 Q153 210 175 253 V300Z" fill="#d58b49" stroke={INK} strokeWidth="2.2"/>
    <ellipse cx="99" cy="260" rx="38" ry="48" fill="#fff9ef"/>
    <path d="M42 151 L54 77 L91 119 M118 122 L171 92 L165 169" fill="#d88b47" stroke={INK} strokeWidth="2.4"/>
    <path d="M54 126 L57 95 L76 124 M140 129 L160 108 L159 141" fill="#e8a9a5"/>
    <path d="M35 164 Q38 119 102 120 Q168 121 175 165 Q187 218 106 228 Q29 222 35 164Z" fill="#d8914d" stroke={INK} strokeWidth="2.2"/>
    <path d="M36 185 Q48 166 75 184 Q100 201 120 185 Q155 171 174 193 Q162 225 106 228 Q52 226 36 201Z" fill="#fffaf0"/>
    <ellipse cx="78" cy="154" rx="6" ry="4" fill="#fffbed"/><ellipse cx="129" cy="162" rx="6" ry="4" fill="#fffbed"/>
    <path d="M69 177 q5 -9 10 0 M122 183 q5 -9 10 0" stroke={INK} strokeWidth="2.7" fill="none" strokeLinecap="round"/>
    <path d="M96 193 q10 -5 13 1 l-6 5Z" fill={INK}/>
    <path d="M102 198 v4 q-4 8 -10 0 M102 202 q5 8 10 0" fill="none" stroke={INK} strokeWidth="2"/>
    <path d="M99 208 q3 11 8 0" fill="#e59aa3" stroke={INK} strokeWidth="1"/>
    <ellipse cx="63" cy="196" rx="8" ry="4" fill="#efadb9"/><ellipse cx="146" cy="204" rx="8" ry="4" fill="#efadb9"/>
    <path d="M66 224 Q100 237 139 225" fill="none" stroke="#bd5a53" strokeWidth="7"/>
    <circle cx="104" cy="234" r="5" fill="#f2cf65" stroke={INK} strokeWidth="1"/>
  </g>
  <Heart x={39} y={122+Math.sin(t*3)*5} s={.63}/><Heart x={159} y={83+Math.cos(t*3)*6} s={.78}/>
</>;

const Disco = ({t,small,punch=0,flash=0}: {t:number;small:boolean;punch?:number;flash?:number}) => <>
  <rect width="200" height="300" fill="url(#disco-bg)"/>
  <g opacity={.15+flash*.12}>
    {[0,1,2].map(i=><path key={i} transform={`rotate(${Math.sin(t*2+i)*23} 100 42)`} d={`M100 42 L${-90+i*125} 205 L${-40+i*125} 205Z`} fill={i===1?'#efd4c7':'#b7b3f3'}/>)}
  </g>
  <path d="M0 207 H200 V300 H0Z" fill="#242e51"/>
  {Array.from({length:7},(_,row)=>{
    const y1=208+Math.pow(row/7,1.7)*92,y2=208+Math.pow((row+1)/7,1.7)*92;
    const w1=24+(y1-208)*2.1,w2=24+(y2-208)*2.1;
    return Array.from({length:9},(_,col)=><path key={`${row}-${col}`} d={`M${100-w1/2+col*w1/9} ${y1} L${100-w1/2+(col+1)*w1/9} ${y1} L${100-w2/2+(col+1)*w2/9} ${y2} L${100-w2/2+col*w2/9} ${y2}Z`} fill={['#546daf','#91acc5','#384880','#6664a1','#958bab','#67999e','#d6ba77'][(row*3+col+Math.floor(t*2))%7]} opacity=".87"/>);
  })}
  <path d="M100 0 V21" stroke={INK} strokeWidth="2"/>
  <circle cx="100" cy="39" r="18" fill="#dedaf1" stroke={INK} strokeWidth="2"/>
  {[-12,-5,3,10].map((v,i)=><path key={i} d={`M${84+Math.abs(v)*.16} ${39+v} H${116-Math.abs(v)*.16} M${100+v} ${24+Math.abs(v)*.25} V${54-Math.abs(v)*.25}`} fill="none" stroke="#7f75b0" strokeWidth=".7"/>)}
  <path d="M90 25 h9 v7 h-9 M101 33 h8 v8 h-8 M87 41 h7 v7 h-7 M103 49 h7 v5 h-7" fill="#f4df72" opacity=".8"/>
  <Star x={91} y={29} r={5} fill="white"/>
  <g transform={`translate(100 204) scale(${1+punch*(.35+.16*Math.sin(t*8))}) translate(-100 -204)`}><Robot x={64} y={166} s={.72} t={t} dance mood="happy"/></g>
  {!small&&[0,1,2,3,4].map(i=><Star key={i} x={20+seed(i+220)*160} y={65+seed(i+230)*223} r={2+(2+flash*3)*(.5+.5*Math.sin(t*4+i*3))} fill={i%2?'#eed778':'#faf4fd'}/>)}
</>;

export const Art = ({kind,t=0,small=false,punch=0,flash=0}: {kind:ClipKind;t?:number;small?:boolean;punch?:number;flash?:number}) => kind==='night'?<Night t={t} small={small}/>:kind==='ramen'?<Ramen t={t} small={small}/>:kind==='dog'?<Dog t={t} small={small}/>:<Disco t={t} small={small} punch={punch} flash={flash}/>;

export const ArtTile = ({x,y,w,h,kind,t=0}: {x:number;y:number;w:number;h:number;kind:ClipKind;t?:number}) => {
  const id=useId().replace(/:/g,'');
  const viewBox=kind==='ramen'?'0 95 200 170':kind==='dog'?'0 76 200 224':'0 0 200 300';
  return <g><defs><clipPath id={id}><rect x={x} y={y} width={w} height={h} rx="5"/></clipPath></defs><g clipPath={`url(#${id})`}><svg x={x} y={y} width={w} height={h} viewBox={viewBox} preserveAspectRatio="none"><use href={`#thumb-${kind}`}/></svg></g></g>;
};

export const ArtDefs = () => <defs>
  <linearGradient id="night-sky" x2="0" y2="1"><stop stopColor="#363d6f"/><stop offset="1" stopColor="#7771ac"/></linearGradient>
  <linearGradient id="ramen-bg" x2="0" y2="1"><stop stopColor="#eed897"/><stop offset="1" stopColor="#fff0b9"/></linearGradient>
  <linearGradient id="disco-bg" x2="0" y2="1"><stop stopColor="#6964a3"/><stop offset=".7" stopColor="#b783b7"/><stop offset="1" stopColor="#554883"/></linearGradient>
  <pattern id="hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(40)"><path d="M0 0 V8 M3 0 V8" stroke="#34312a" strokeWidth=".8" opacity=".25"/></pattern>
  <pattern id="paper-grain" width="80" height="80" patternUnits="userSpaceOnUse">{Array.from({length:26},(_,i)=><circle key={i} cx={seed(i)*80} cy={seed(i+80)*80} r={.3+seed(i+90)*.7} fill="#8b7c63" opacity=".16"/>)}</pattern>
  <filter id="blur"><feGaussianBlur stdDeviation="4"/></filter>
  {(['night','ramen','dog','disco'] as const).map(kind=><g id={`thumb-${kind}`} key={kind}><Art kind={kind} small t={1}/></g>)}
</defs>;
