const SERVER = 'http://localhost:3000'

export function makeGetRequest(endpoint) {
  return fetch(`${SERVER}/${endpoint}`).then((res) => res.json())
}

export function makePostRequest(endpoint, body) {
  return fetch(`${SERVER}/${endpoint}`, {
    method: 'post',
    body: JSON.stringify(body),
  }).then((res) => res.json())
}
