import type { StatType } from '~/shared/types/api'

export interface ITwitchConfig {
  username?: string
  stats?: StatType[]
}

declare global {
  interface Window {
    Twitch: any
  }
}

class TwitchApi {
  onAuthorized() {
    return new Promise((r) => window.Twitch.ext.onAuthorized(r))
  }

  /**
   * Get Extension Configuration Segment
   * https://dev.twitch.tv/docs/extensions/reference/#get-extension-configuration-segment
   */
  getConfigurationSegment(): ITwitchConfig | undefined {
    const config = window.Twitch.ext.configuration.broadcaster?.content
    if (!config) return

    try {
      return JSON.parse(config)
    } catch (error) {
      return undefined
    }
  }

  setConfigurationSegment(config: ITwitchConfig) {
    window.Twitch.ext.configuration.set(
      'broadcaster',
      '',
      JSON.stringify(config)
    )
  }
}

export default new TwitchApi()
