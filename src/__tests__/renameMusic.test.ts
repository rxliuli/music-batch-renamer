import { getMusicName, renameMusicName } from '../renameMusic'
import * as path from 'path'
import { copy, mkdirp, pathExists, remove, rename } from 'fs-extra'
import { sortBy } from '@liuli-util/array'
import promise from 'glob-promise'
import { AsyncArray } from '@liuli-util/async'

describe('测试 renameMusic', () => {
  it('测试获取歌曲文件名', async () => {
    expect(await getMusicName(path.resolve(__dirname, 'asset/file.mp3'))).toBe(
      '山冈的小牧童到茶山顶.mp3',
    )
  })
  describe('测试 renameMusicName', () => {
    const tempPath = path.resolve(__dirname, '.temp')
    const musicPath = path.resolve(tempPath, 'file.mp3')
    beforeEach(async () => {
      await remove(tempPath)
      await mkdirp(tempPath)
      await copy(path.resolve(__dirname, 'asset/file.mp3'), musicPath)
    })
    it('基本示例', async () => {
      await renameMusicName(musicPath)
      expect(await pathExists(musicPath)).toBeFalsy()
    })
  })
  describe('测试重命名', () => {
    it('基本示例', async () => {
      const cwd = path.resolve('D:\\Download\\test\\www.goflac.com (7)')
      const list = sortBy(await promise('*.mp3', { cwd }), (name) => {
        const regExp = /(\d+).*\.mp3/
        if (!regExp.test(name)) {
          return Number.MAX_SAFE_INTEGER
        }
        return Number.parseInt(regExp.exec(name)![1])
      })
      let i = 91
      await AsyncArray.forEach(list, async (s) => {
        try {
          const musicPath = path.resolve(cwd, s)
          const name = await getMusicName(musicPath)
          const newName = `${(i++).toString().padStart(3, '0')} ` + name
          await rename(
            musicPath,
            path.resolve(path.dirname(musicPath), newName),
          )
          console.info(`重命名成功 ${s} => ${newName}`)
        } catch (e) {
          console.error('重命名失败 ' + s)
        }
      })
      console.log('list: ', list)
    })
  })
})
