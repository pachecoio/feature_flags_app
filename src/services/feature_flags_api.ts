import FeatureFlag from "../models/FeatureFlag";
import {getApiUrl} from "./config";

export const updateFlag = async (flag: FeatureFlag) => {
  const body = JSON.stringify(flag);
  // @ts-ignore
  const res = await fetch(`${getApiUrl()}/admin/feature_flags/${flag._id.$oid}`, {
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
  return fetch(`${getApiUrl()}/admin/feature_flags/${id}`).then(res => res.json())
}


export const createFlag = async (flag: FeatureFlag) => {
  const body = JSON.stringify(flag);
  const res = await fetch(`${getApiUrl()}/admin/feature_flags`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

export const deleteFlag = async (id: string) => {
  const res = await fetch(`${getApiUrl()}/admin/feature_flags/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

export const getFlags = () => fetch(`${getApiUrl()}/admin/feature_flags`).then(res => res.json())

export const getFlagsFromContext = async (context: any) => {
  const res = await fetch(`${getApiUrl()}/flags`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({context}),
  })
  return res.json()
}