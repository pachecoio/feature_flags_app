import FeatureFlag from "../models/FeatureFlag";

export const updateFlag = async (flag: FeatureFlag) => {
  const body = JSON.stringify(flag);
  // @ts-ignore
  const res = await fetch(`http://localhost:8080/feature_flags/${flag._id.$oid}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  const resp = res.json()
  return resp
}

export const getFlag = (id: string) => {
  return fetch(`http://localhost:8080/feature_flags/${id}`).then(res => res.json())
}