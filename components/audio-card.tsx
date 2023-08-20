import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

interface AudioCardProps {
  url: string;
}

export const AudioCard = ({ url }: AudioCardProps) => (
  <AudioPlayer
    src={url}
    autoPlay={false}
    style={{ border: "solid 1px black", borderRadius: "0.5rem" }}
  />
);