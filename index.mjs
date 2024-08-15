import readline from "node:readline";
import ytdl from "@distube/ytdl-core";
import ffmpeg from "fluent-ffmpeg";
import urls from "./urls.mjs";

function download(props) {
  return new Promise((resolve, reject) => {
    const stream = ytdl(props.url, { format: "mp3", filter: "audioonly" });

    const proc = ffmpeg({ source: stream });

    proc.setFfmpegPath("/opt/homebrew/bin/ffmpeg");

    let start = Date.now();
    proc
      .audioBitrate(128)
      .save(`./source/${props.name}.mp3`)
      .on("progress", (p) => {
        readline.cursorTo(process.stdout, 0);
        process.stdout.write(`${p.targetSize}kb downloaded`);
      })
      .on("error", (error) => reject(error))
      .on("end", () => {
        console.debug(`\ndone, thanks - ${(Date.now() - start) / 1000}s`);
        resolve();
      });
  });
}

async function init() {
  for (const url of urls) {
    try {
      console.log("", url.name);
      await download(url);
      console.log("done");
    } catch (e) {
      console.error(e);
      continue;
    }
  }
}

init();
