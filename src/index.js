import useragent from 'useragent'
import { getSupport } from 'caniuse-api'
import R from 'ramda'
import { zipObj } from './utils'

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

  const availableSupport = features.map(getSupport)

  const featuresWithSpecs = zipObj(features, availableSupport)

  const featureMap = {}

  R.mapObjIndexed((value, key) => {
    Object.keys(value).forEach((k) => {
      featureMap[k] = { [key]: value[k] }
    })
  }, featuresWithSpecs)

  console.log(featureMap)

  return (req, res, next) => {
    const agent = req.headers['user-agent']

    if (!agent) {
      req.capabilities = {}
      return next()
    }

    const ua = useragent.lookup(agent)
  }
}

canIUseMiddleWare({ features: [
  'border-radius'
]})
