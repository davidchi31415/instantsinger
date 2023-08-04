import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

export const AudioCard = ({ url }) => (
  <AudioPlayer
    src={url}
    onPlay={e => console.log("onPlay")}
  />
);