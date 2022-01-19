# music-batch-renamer

> [中文](https://github.com/rxliuli/music-batch-renamer/blob/master/README.zh-CN.md)

The cli tool for batch renaming of songs supports automatic renaming of music downloaded in batches according to metadata. Currently, only music titles are used.

## use

Install

```sh
pnpm i -g music-batch-renamer
# or use npm
npm i -g music-batch-renamer
```

use

```sh
music-batch-renamer -p ./**/*.mp3 ./**/*.flac
```
