import Environment from "../models/Environment";
import FeatureFlag from "../models/FeatureFlag";
import {getApiUrl} from "./config";

export const createEnvironment = async (env: Environment) => {
  const body = JSON.stringify(env);
  const res = await fetch(`${getApiUrl()}/admin/environments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

export const deleteEnvironment = async (id: string) => {
  const res = await fetch(`${getApiUrl()}/admin/environments/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

type EnvironmentFlagRequest = {
  envId: string,
  flag: FeatureFlag
}

export const setEnvironmentFlag = async ({envId, flag}: EnvironmentFlagRequest) => {
  const body = JSON.stringify(flag);
  const res = await fetch(`${getApiUrl()}/admin/environments/${envId}/flags`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

type DeleteEnvironmentFlagRequest = {
  envId: string,
  flagName: string
}

export const deleteEnvironmentFlag = async ({envId, flagName}: DeleteEnvironmentFlagRequest) => {
  const res = await fetch(`${getApiUrl()}/admin/environments/${envId}/flags/${flagName}`, {
    method: 'DELETE',
  })
  return res.json()
}

export const getEnvironment = (id: string | undefined) => fetch(`${getApiUrl()}/admin/environments/${id}`).then(res => res.json())

export const getEnvironments = () => fetch(`${getApiUrl()}/admin/environments`).then(res => res.json())

export const getEnvironmentFlagsFromContext = async (environmentName: string, context: any) => {
  const res = await fetch(`${getApiUrl()}/flags/${environmentName}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({context}),
  })
  return res.json()
}
