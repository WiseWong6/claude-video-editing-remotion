export const WIDTH = 1280;
export const HEIGHT = 720;
export const FPS = 30;
export const FRAMES = 900;
export const DURATION = FRAMES / FPS;
export const clamp = (n: number, lo = 0, hi = 1) => Math.min(hi, Math.max(lo, n));
export const ease = (x: number) => { const t = clamp(x); return t * t * (3 - 2 * t); };
export const progress = (t: number, a: number, b: number) => ease((t - a) / (b - a));
export const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
export const seed = (i: number) => {const n = Math.sin(i * 127.1 + 311.7) * 43758.5453; return n - Math.floor(n);};
export type ClipKind = 'night' | 'ramen' | 'dog' | 'disco';
export const SECTIONS = [
  {start: 0, end: 2.1, label: '画出剪辑界面'},
  {start: 2.1, end: 5.0, label: '依次拖入四段素材'},
  {start: 5.0, end: 8.3, label: '剪掉发呆片段'},
  {start: 8.3, end: 11.8, label: '添加旋转、翻页、故障转场'},
  {start: 11.8, end: 15.5, label: '输入字幕与撤销'},
  {start: 15.5, end: 20.4, label: '调整闪光、饱和度与缩放'},
  {start: 20.4, end: 23.6, label: '跟着音乐卡点'},
  {start: 23.6, end: 26.1, label: '导出成片'},
  {start: 26.1, end: 30, label: '成片展示与手写结语'},
] as const;

/** All visual state comes from the current frame, including reverse seeking. */
export const stateAt = (frame: number) => {
  const t = clamp(frame, 0, FRAMES - 1) / FPS;
  const ending = progress(t, 25.7, 26.45);
  let kind: ClipKind = t < 5.3 ? 'night' : t < 11.6 ? 'ramen' : t < 15.4 ? 'dog' : 'disco';
  if (t >= 26.35) kind = t < 27.15 ? 'night' : t < 27.85 ? 'ramen' : t < 28.55 ? 'dog' : 'disco';
  const cut = progress(t, 7.15, 7.8);
  const captionLength = t < 13.55 ? Math.floor(clamp((t - 12.05) / 1.35) * 6) : t < 14.05 ? 6 : t < 14.7 ? 4 : 6;
  const editingPosition = t < 5 ? 0 : t < 8.3 ? lerp(2.4,4.6,progress(t,5,8.3)) : t < 11.8 ? lerp(2.4,6.0,progress(t,8.3,11.8)) : t < 15.5 ? lerp(5.6,7.2,progress(t,11.8,15.5)) : t < 23.6 ? lerp(7.2,10.4,progress(t,15.5,23.6)) : 10.4;
  const shots = [[0,1,0,0],[1.75,1,0,0],[2.4,1.13,-9,-77],[5.15,1.13,-9,-77],[5.6,1.3,-19,-160],[7.75,1.3,-19,-160],[8.3,1.28,0,-91],[11.55,1.28,0,-91],[12.0,1.3,-134,-88],[15.35,1.3,-134,-88],[15.95,1.32,-457,-10],[19.8,1.32,-457,-10],[20.45,1.055,-44,-58],[23.15,1.055,-44,-58],[23.8,1.2,-430,0],[25.1,1.2,-430,0],[25.65,1,0,0],[30,1,0,0]];
  const next=shots.findIndex(k=>k[0]>t);
  const a=shots[Math.max(0,next-1)],b=shots[next<0?shots.length-1:next];
  const mix=progress(t,a[0],b[0]);
  const zoom=lerp(a[1],b[1],mix),focusX=lerp(a[2],b[2],mix),focusY=lerp(a[3],b[3],mix);
  return {t, kind, cut, ending, captionLength, editingPosition,
    tab: t < 8.3 ? 0 : t < 11.8 ? 1 : 2,
    zoom, focusX, focusY,
    flash: .7 * progress(t,15.7,16.65),
    saturation: t < 17.8 ? 1 + .98 * progress(t,16.8,17.5) : lerp(1.98,1.1,progress(t,17.8,18.15)),
    punch: .6 * progress(t,18.25,19.5),
    exportProgress: progress(t,24.0,25.65),
  };
};

export const cameraAt = (frame: number) => {
  // Blending the recent target avoids camera jumps at beat boundaries.
  const from = Math.max(0, frame - 13);
  let z = 0, x = 0, y = 0, sum = 0;
  for(let f = from; f <= frame; f++) {
    const w = f - from + 1;
    const s = stateAt(f);
    z += s.zoom*w; x += s.focusX*w; y += s.focusY*w; sum += w;
  }
  return {zoom:z/sum,x:x/sum,y:y/sum};
};
