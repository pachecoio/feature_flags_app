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


export const createFlag = async (flag: FeatureFlag) => {
  const body = JSON.stringify(flag);
  console.log('post flag', flag)
  const res = await fetch('http://localhost:8080/feature_flags', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

export const deleteFlag = async (id: string) => {
  const res = await fetch(`http://localhost:8080/feature_flags/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}