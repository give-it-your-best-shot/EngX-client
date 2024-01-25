import { Sound } from "@pixi/sound";
import { Theme } from "src/services/engx_game_service";
import { randRange } from "./math_util";

interface Music {
  name: string;
  src: string;
}

export const music = {
  normal: [],
  fantasy: [
    {
      name: "Library of Ruina - Hod Battle Theme 1",
      src: "/game/music/fantasy/Library of Ruina - Hod Battle Theme 1.wav",
    },
    {
      name: "Mili - Iron Lotus",
      src: "/game/music/fantasy/Mili - Iron Lotus.wav",
    },
  ],
  future: [
    {
      name: "Library of Ruina - Yesod Battle Theme 1",
      src: "/game/music/future/Library of Ruina - Yesod Battle Theme 1.wav",
    },
    {
      name: "Undertale - DeathByGlamour",
      src: "/game/music/future/Undertale - DeathByGlamour.mp3",
    },
  ],
  cartoon: [],
};

export default class MusicPlayer {
  private static instance: MusicPlayer;
  public static getInstance(): MusicPlayer {
    if (this.instance == null) {
      this.instance = new MusicPlayer();
    }
    return this.instance;
  }

  private current_sound: Sound | undefined;

  public selectSongInTheme(theme: Theme) {
    let song_list = music[theme];
    if (song_list.length < 1) {
      song_list = music.future.concat(music.fantasy);
    }
    const song_id = randRange(0, song_list.length - 1);
    const song = song_list[song_id];

    this.current_sound = Sound.from({
      preload: true,
      url: song.src,
    });

    this.current_sound.loop = true;
    this.current_sound.autoPlay = true;
  }

  public setVolume(volume: number) {
    if (this.current_sound) {
      this.current_sound.volume = volume;
    }
  }

  public autoPlayStart() {
    if (this.current_sound?.isLoaded) {
      this.current_sound.autoPlayStart();
    }
  }

  public stop() {
    if (this.current_sound && this.current_sound.isPlaying) {
      this.current_sound.stop();
    }
  }
}
