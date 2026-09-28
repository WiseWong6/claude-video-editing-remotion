import {Composition} from 'remotion';
import {Film} from './Film';
import {FPS, FRAMES, WIDTH, HEIGHT} from './timeline';
export const Root = () => <Composition id="ClaudeVideoEditing" component={Film} width={WIDTH} height={HEIGHT} fps={FPS} durationInFrames={FRAMES} defaultProps={{}} />;
