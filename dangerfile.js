// Module imports
import commitlint from 'danger-plugin-conventional-commitlint'
import configConventional from '@commitlint/config-conventional'





(async function dangerReport() {
  await commitlint(configConventional.rules, { severity: 'warn' })
})()
