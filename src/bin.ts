import { Command } from 'commander'
import promise from 'glob-promise'
import * as path from 'path'
import { AsyncArray } from '@liuli-util/async'
import { renameMusicName } from './renameMusic'

new Command()
  .option('-p, --patterns <patterns...>', '匹配模式')
  .action(async (options: { patterns: string[] }) => {
    const cwd = path.resolve()
    let success = 0,
      error = 0
    // noinspection ES6MissingAwait
    await new AsyncArray(options.patterns)
      .flatMap((p) => promise(p, { cwd }))
      .forEach(async (s) => {
        try {
          await renameMusicName(path.resolve(cwd, s))
          console.info('重命名成功 ' + s)
          success++
        } catch (e) {
          console.error('重命名失败 ' + s)
          error++
        }
      })
    console.log(`本次共成功 ${success} 个，失败 ${error} 个`)
  })
  .parse()
