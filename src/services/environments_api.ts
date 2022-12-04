import Environment from "../models/Environment";
import FeatureFlag from "../models/FeatureFlag";

export const createEnvironment = async (env: Environment) => {
  const body = JSON.stringify(env);
  const res = await fetch('http://localhost:8080/environments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

export const deleteEnvironment = async (id: string) => {
  const res = await fetch(`http://localhost:8080/environments/${id}`, {
    method: 'DELETE',
  })
  return res.json()
}

type EnvironmentFlagRequest = {
  envId: string,
  flag: FeatureFlag
}

export const setEnvironmentFlag = async ({envId, flag}: EnvironmentFlagRequest) => {
  console.log('set env flag', flag)
  const body = JSON.stringify(flag);
  console.log('post flag', body)
  const res = await fetch(`http://localhost:8080/environments/${envId}/flags`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}

export const getEnvironment = (id: string | undefined) => fetch(`http://localhost:8080/environments/${id}`).then(res => res.json())

