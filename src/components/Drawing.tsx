import React from 'react';
export const INK = '#302d27';
export const PAPER = '#f6f3e9';
export const TEAL = '#7ebdb3';
export const GOLD = '#f2cf65';
export const RED = '#c96f58';
export const Label = ({x,y,children,size=17,fill=INK,anchor='start',weight=400,...rest}: {x:number;y:number;children:React.ReactNode;size?:number;fill?:string;anchor?:'start'|'middle'|'end';weight?:number} & React.SVGProps<SVGTextElement>) => <text x={x} y={y} fill={fill} fontFamily="Wenkai, cursive" fontSize={size} fontWeight={weight} textAnchor={anchor} {...rest}>{children}</text>;
export const Box = ({x,y,w,h,r=8,fill=PAPER,stroke=INK,sw=2.3,opacity=1}: {x:number;y:number;w:number;h:number;r?:number;fill?:string;stroke?:string;sw?:number;opacity?:number}) => <g opacity={opacity}>
  <rect x={x+1.6} y={y+1.4} width={w} height={h} rx={r} fill={stroke} opacity=".09"/>
  <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={sw}/>
  <path d={`M ${x+r+3} ${y+1.4} Q ${x+w*.52} ${y-1} ${x+w-r} ${y+1} M ${x+1} ${y+r} Q ${x-1} ${y+h*.6} ${x+1.8} ${y+h-r}`} fill="none" stroke={stroke} strokeWidth=".55" opacity=".38"/>
</g>;
export const Star = ({x,y,r=7,fill='#fff9d8',opacity=1}: {x:number;y:number;r?:number;fill?:string;opacity?:number}) => <path d={`M${x} ${y-r} Q${x+1} ${y-1} ${x+r} ${y} Q${x+1} ${y+1} ${x} ${y+r} Q${x-1} ${y+1} ${x-r} ${y} Q${x-1} ${y-1} ${x} ${y-r}Z`} fill={fill} stroke={INK} strokeWidth="1" opacity={opacity}/>;
export const Heart = ({x,y,s=1,fill='#e795ae'}: {x:number;y:number;s?:number;fill?:string}) => <path transform={`translate(${x} ${y}) scale(${s})`} d="M0 5 C-17 -7 -13 -20 -5 -19 C-1 -19 0 -13 0 -13 C1 -22 16 -23 13 -9 C11 -2 5 3 0 8Z" fill={fill} stroke={INK} strokeWidth="2.2"/>;
export const Arm = ({x1,y1,x2,y2,bend=0}: {x1:number;y1:number;x2:number;y2:number;bend?:number}) => <g fill="none" strokeLinecap="round" strokeLinejoin="round">
  <path d={`M${x1} ${y1} Q${(x1+x2)/2+bend} ${(y1+y2)/2} ${x2} ${y2}`} stroke={INK} strokeWidth="12"/>
  <path d={`M${x1} ${y1} Q${(x1+x2)/2+bend} ${(y1+y2)/2} ${x2} ${y2}`} stroke={RED} strokeWidth="7.5"/>
  <circle cx={x2} cy={y2} r="7" fill={RED} stroke={INK} strokeWidth="2"/>
</g>;
export const Robot = ({x=0,y=0,s=1,t=0,mood='happy',dance=false,glasses=false,rotate=0}: {x?:number;y?:number;s?:number;t?:number;mood?:'happy'|'focus'|'sleep'|'wink';dance?:boolean;glasses?:boolean;rotate?:number}) => {
  const sway=dance?Math.sin(t*8)*7:0;
  const hop=dance?-Math.abs(Math.sin(t*8))*8:0;
  return <g transform={`translate(${x} ${y+hop}) scale(${s}) rotate(${rotate+sway} 50 35)`} stroke={INK} strokeWidth="2.2" strokeLinejoin="round">
    {dance && <><Arm x1={6} y1={35} x2={-12} y2={-2+Math.sin(t*8)*5} bend={-12}/><Arm x1={96} y1={35} x2={113} y2={-8-Math.sin(t*8)*5} bend={15}/></>}
    <path d="M12 57 L13 84 L22 85 L23 59 M27 59 L28 86 L38 85 L38 59 M68 59 L69 85 L78 85 L79 59 M82 58 L83 83 L91 83 L92 56" fill={RED}/>
    {!dance&&<path d="M0 26 H-10 V38 H0 M100 26 H110 V38 H100" fill={RED}/>}
    <path d="M0 0 Q47 -3 100 0 L101 63 Q49 65 0 63Z" fill={RED}/>
    <path d="M6 6 L92 4 M6 9 L22 9" stroke="#e8977a" strokeWidth="2.5" opacity=".8"/>
    {Array.from({length:14},(_,i)=><path key={i} d={`M${7+i*6} 15 l-5 12`} opacity=".13" stroke="#edaa85" strokeWidth="1"/>)}
    {mood==='focus'||mood==='sleep'?<path d={mood==='focus'?'M29 22 l10 3 M62 25 l10 -3':'M29 26 h9 M63 26 h9'} strokeWidth="4" strokeLinecap="round"/>:mood==='happy'?<path d="M29 29 Q34 16 40 29 M62 29 Q68 16 74 29" fill="none" strokeWidth="3.3" strokeLinecap="round"/>:<><ellipse cx="34" cy="26" rx="3" ry="7" fill={INK}/><path d="M62 28 Q67 17 73 28" fill="none" strokeWidth="3"/></>}
    {mood==='wink'&&<circle cx="34" cy="23" r="1" fill="white" stroke="none"/>}
    {mood==='happy'||mood==='wink'?<><ellipse cx="25" cy="37" rx="8" ry="4" fill="#e88792" stroke="none" opacity=".65"/><ellipse cx="78" cy="37" rx="8" ry="4" fill="#e88792" stroke="none" opacity=".65"/></>:null}
    {glasses&&<g transform="translate(23 -7) rotate(-4)"><path d="M0 0 H63 L57 12 H42 L32 4 L25 12 H8Z" fill={INK}/><path d="M11 3 l-5 5 m10 -5 l-5 5 m33 -5 l-5 5 m10 -5 l-5 5" stroke="#faf6e9" strokeWidth="1.5"/></g>}
  </g>;
};
