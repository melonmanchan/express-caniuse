export function zipObj (arr1, arr2) {
  const out = {}

  for (let i = 0; i < arr1.length; i++) {
    out[arr1[i]] = arr2[i]
  }

  return out
}
