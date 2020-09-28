import { join } from 'path'
import { LOGS_DIR, ROOT_DIR } from '~/config'
import { ensureDirs, exists } from '~/modules/fs/dir'

describe('modules/fs/dir', () => {
  it('should return false', async () => {
    const dir = join(ROOT_DIR, 'does-not-exist')
    expect(await exists(dir)).toBeFalsy()
  })

  it('should ensure that the directories exist', async () => {
    await ensureDirs()
    expect(await exists(LOGS_DIR)).toBeTruthy()
  })
})
