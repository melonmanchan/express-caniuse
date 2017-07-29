import useragent from 'useragent'
import { getSupport } from 'caniuse-api'
import R from 'ramda'
import { zipObj, parseFeaturesFromSpecs } from './utils'

// TODO: enable more agents
const AGENT_TO_CANIUSE = {
  'ie': 'ie',
  'edge': 'edge',
  'firefox': 'firefox',
  'Chrome': 'chrome',
  'safari': 'safari',
  'opera': 'opera'
}

export default function canIUseMiddleWare (opts = {}) {
  const features = opts.features || []

  const availableSupport = features.map(getSupport)

  const featuresWithSpecs = zipObj(features, availableSupport)

  const featureMap = parseFeaturesFromSpecs(featuresWithSpecs)

  return (req, res, next) => {
    req.capabilities = {}

    const agent = req.headers['user-agent']

    if (!agent) {
      return next()
    }

    const ua = useragent.lookup(agent)

    if (ua === 'Other') {
      return next()
    }

    const { family, major, minor } = ua

    const lookUp = AGENT_TO_CANIUSE[family]

    const version = parseFloat(`${major}.${minor}`)

    const browserCapabilities = featureMap[lookUp]

    req.capabilities = R.map(s => version >= s.y, browserCapabilities)

    next()
  }
}

canIUseMiddleWare({ features: [
  'border-radius',
  'css3-cursors'
]})(
  {
    headers: {
      'user-agent': 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2228.0 Safari/537.36'
    }
  },
  {},
  () => {}
)
