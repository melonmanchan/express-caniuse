import useragent from 'useragent'
import { getSupport } from 'caniuse-api'
import R from 'ramda'
import {
  zipObj,
  parseFeaturesFromSpecs,
  matchBrowserToCanIUseKey
} from './utils'

function canIUseMiddleWare (opts = {}) {
  const features = opts.features || []

  const availableSupport = features.map(getSupport)

  const featuresWithSpecs = zipObj(features, availableSupport)

  const featureMap = parseFeaturesFromSpecs(featuresWithSpecs)

  return (req, res, next) => {
    req.capabilities = {}

    const agent = req.headers['user-agent'] || req.headers['x-user-agent']

    if (!agent) {
      return next()
    }

    const ua = useragent.lookup(agent)

    if (ua === 'Other') {
      return next()
    }

    const { family, major, minor } = ua

    const lookUp = matchBrowserToCanIUseKey(family)

    if (!lookUp) {
      return next()
    }

    const version = parseFloat(`${major}.${minor}`)

    const browserCapabilities = featureMap[lookUp]

    req.capabilities = R.map(s => version >= s.y, browserCapabilities)

    next()
  }
}

module.exports = canIUseMiddleWare
