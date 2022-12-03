import Environment from "../models/Environment";

export const createEnvironment = async (env: Environment) => {
  const body = JSON.stringify(env);
  console.log('post env', env)
  const res = await fetch('http://localhost:8080/environments', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  })
  return res.json()
}
