import R from 'ramda'

// TODO: enable more agents
const AGENT_TO_CANIUSE_LOOKUP = {
  'Android': 'android',
  'BlackBerry WebKit': 'bb',
  'Chrome Mobile': 'and_chr',
  'Chrome': 'chrome',
  'Edge': 'edge',
  'Firefox Mobile': 'and_ff',
  'Firefox': 'firefox',
  'IE Mobile': 'ie_mob',
  'IE': 'ie',
  'Mobile Safari': 'ios_saf',
  'Opera Mini': 'op_mini',
  'Opera Mobile': 'op_mob',
  'Opera': 'opera',
  'Safari': 'safari'
}

export function zipObj (keys = [], values = []) {
  const out = {}

  for (let i = 0; i < keys.length; i++) {
    out[keys[i]] = values[i]
  }

  return out
}

export function parseFeaturesFromSpecs (specs) {
  const out = {}

  R.mapObjIndexed((value, key) => {
    Object.keys(value).forEach((k) => {
      out[k] = Object.assign({}, out[k] || {}, { [key]: value[k] })
    })
  }, specs)

  return out
}

export function matchBrowserToCanIUseKey (key) {
  return AGENT_TO_CANIUSE_LOOKUP[key]
}
