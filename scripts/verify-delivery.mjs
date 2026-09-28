import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const file=process.argv[2]??'delivery/claude-video-editing.mp4';
const meta=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_entries','format=duration:stream=codec_type,width,height,r_frame_rate,nb_read_frames','-of','json',file],{encoding:'utf8'}));
const video=meta.streams.find(s=>s.codec_type==='video');
assert.ok(video);assert.equal(video.width,1280);assert.equal(video.height,720);assert.equal(video.r_frame_rate,'30/1');assert.equal(Number(video.nb_read_frames),900);
assert.ok(Math.abs(Number(meta.format.duration)-30)<.1);assert.ok(meta.streams.some(s=>s.codec_type==='audio'));
execFileSync('ffmpeg',['-v','error','-i',file,'-f','null','-'],{stdio:'pipe'});
console.log('通过：1280×720，30 帧/秒，900 帧，30 秒，包含音轨；整段解码无错误。');
