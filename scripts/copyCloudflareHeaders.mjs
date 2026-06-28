import {copyFileSync, existsSync} from 'node:fs'

if (existsSync('dist/client/_headers')) {
  copyFileSync('dist/client/_headers', 'dist/_headers')
}
