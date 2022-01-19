# music-batch-renamer

歌曲批量重命名 cli 工具，支持将批量下载的音乐根据元数据自动重命名，目前仅使用音乐标题。

## 使用

安装

```sh
pnpm i -g music-batch-renamer
#或者使用 npm
npm i -g music-batch-renamer
```

使用

```sh
music-batch-renamer -p ./**/*.mp3 ./**/*.flac
```
