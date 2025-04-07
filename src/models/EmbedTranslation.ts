import { DownloadOption, StreamOption } from './Translation';

export interface EmbedTranslation {
  embedUrl: string;
  download: DownloadOption[];
  stream: StreamOption[];
  subtitlesUrl: string;
  subtitlesVttUrl: string;
}
