import inject from './inject'
import Vault from 'src/services/vault'
import createAppVault from 'src/vault/app'
import { Cookies } from 'quasar'

export default inject(async ({ app, ssrContext }) => {
  const cookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies

  const vault = new Vault()
  if (process.env.SERVER) {
    ssrContext.rendered = () => {
      ssrContext.vaultState = JSON.stringify(vault.state)
    }
  } else if (window.__VAULT_STATE__) {
    vault.replaceState(window.__VAULT_STATE__)
  }

  const appModule = createAppVault({ cookies, i18n: app.i18n })
  vault.registerModule('app', appModule)
  return {
    vault: vault
  }
})
