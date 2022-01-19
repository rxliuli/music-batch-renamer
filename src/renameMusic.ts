import { parseFile } from 'music-metadata'
import * as path from 'path'
import { rename } from 'fs-extra'

/**
 * 获取歌曲的名字
 * @param musicPath
 */
export async function getMusicName(musicPath: string) {
  const metadata = await parseFile(musicPath)
  return metadata.common.title + path.extname(musicPath)
}

/**
 * 重命名指定文件
 * @param musicPath
 */
export async function renameMusicName(musicPath: string) {
  const name = await getMusicName(musicPath)
  await rename(musicPath, path.resolve(path.dirname(musicPath), name))
}
