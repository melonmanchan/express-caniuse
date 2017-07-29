import R from 'ramda'

// TODO: enable more agents
const AGENT_TO_CANIUSE_LOOKUP = {
  'ie': 'ie',
  'edge': 'edge',
  'firefox': 'firefox',
  'Chrome': 'chrome',
  'safari': 'safari',
  'opera': 'opera'
}

export function zipObj (arr1, arr2) {
  const out = {}

  for (let i = 0; i < arr1.length; i++) {
    out[arr1[i]] = arr2[i]
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
