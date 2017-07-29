import useragent from 'useragent'
import R from 'ramda'

// TODO: enable more agents
const AGENT_TO_CANIUSE = {
  'ie': 'ie',
  'edge': 'edge',
  'firefox': 'firefox',
  'chrome': 'chrome',
  'safari': 'safari',
  'opera': 'opera'
}

export default function canIUseMiddleWare (opts = {}) {
  const features = opts.features || []

  const canIUseKeys = R.values(AGENT_TO_CANIUSE)

  const featureMap = canIUseKeys.map((k) => {
    return { k: {} }
  })

  const files = features.map(f => `caniuse-db/features-json/${f}.json`)

  const featureJSONS = files.map(f => require(f))

  const justSpecs = featureJSONS.map(R.pick('specs'))

  const featuresWithSpecs = R.toPairs(features, justSpecs)

  R.mapObjIndexed((value, key) => {
    const specs = canIUseKeys.map(k => value[k])
    featureMap[key] = specs

    canIUseKeys.forEach((k) => {
      const asd = value[k]
      featureMap[key] = Object.create({}, featureMap[key], asd)
    })
  }, featuresWithSpecs)

  return (req, res, next) => {
    const agent = req.headers['user-agent']

    if (!agent) {
      req.capabilities = {}
      return next()
    }

    const ua = useragent.lookup(agent)
  }
}
