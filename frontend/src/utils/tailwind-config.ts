import twConfig from '../../tailwind.config.ts'

export const tailwindMergeConfig = {
  cacheSize: 500,
  theme: {},
  classGroups: {
    'text': Object.keys(twConfig.theme.extend.fontSize).map(
      key => `${key}`,
    )
  }
}