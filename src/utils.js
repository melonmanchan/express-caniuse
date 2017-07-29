import R from 'ramda'

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
