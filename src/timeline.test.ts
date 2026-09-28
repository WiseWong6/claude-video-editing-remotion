import {test} from 'node:test';
import assert from 'node:assert/strict';
import {cameraAt,FRAMES,SECTIONS,stateAt} from './timeline.ts';
test('所有阶段连续覆盖三十秒，没有空隙或重叠',()=>{
 assert.equal(SECTIONS[0].start,0);assert.equal(SECTIONS.at(-1)!.end,30);
 SECTIONS.slice(1).forEach((section,i)=>assert.equal(section.start,SECTIONS[i].end));
});
test('整段九百帧均有合法的画面和镜头状态',()=>{
 for(let f=0;f<FRAMES;f++){
  const s=stateAt(f),c=cameraAt(f);
  [s.t,s.cut,s.ending,s.editingPosition,s.flash,s.saturation,s.punch,c.x,c.y,c.zoom].forEach(n=>assert.ok(Number.isFinite(n)));
  assert.ok(s.captionLength>=0&&s.captionLength<=6);
  assert.ok(c.zoom>=1&&c.zoom<=1.4);
  assert.ok(s.editingPosition>=0&&s.editingPosition<=10.4);
 }
});
test('逆序跳转与顺序播放逐帧相同，剪切和导出完成后保持稳定',()=>{
 const forward=Array.from({length:FRAMES},(_,f)=>JSON.stringify([stateAt(f),cameraAt(f)]));
 for(let f=FRAMES-1;f>=0;f--)assert.equal(JSON.stringify([stateAt(f),cameraAt(f)]),forward[f]);
 assert.equal(stateAt(250).cut,1);assert.equal(stateAt(800).exportProgress,1);assert.equal(stateAt(899).kind,'disco');
});
