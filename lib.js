export async function getCustomerData() {
  const response = await fetch('http://localhost:3000/api/customerdetails')
  return response.json()
}

export async function getRecentOrderSummary() {
  return [
    {
      type: 'Total orders',
      value: 30,
    },
    {
      type: 'Total delivered',
      value: 10,
    },
  ]
}

export async function getIngredientsSummary() {
  return [
    {
      type: 'Total ingredients',
      value: 30,
    },
    {
      type: 'Total hidden',
      value: 10,
    },
  ]
}

export async function getSuppliersSummary() {
  return [
    {
      type: 'Total suppliers',
      value: 30,
    },
    {
      type: 'Suppliers hidden',
      value: 10,
    },
  ]
}

export async function getRecentOrders() {
  return [
    {
      id: '231312312',
      ingredients: 'Alu 2kg, potol 3kg, cheese 5kg',
      size: 'M',
      address: '69 Puppestraße, 09126 Chemnitz',
      phone: '01712880022',
      status: false,
    },
    {
      id: '4123123123',
      ingredients: 'Alu 2kg, potol 3kg, cheese 5kg',
      size: 'M',
      address: '69 Puppestraße, 09126 Chemnitz',
      phone: '01712880022',
      status: false,
    },
    {
      id: '2232323',
      ingredients: 'Alu 2kg, potol 3kg, cheese 5kg',
      size: 'M',
      address: '69 Puppestraße, 09126 Chemnitz',
      phone: '01712880022',
      status: false,
    },
  ]
}

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

export function toggleSupplierVisibility(bakerId, supplierId) {
  return makePostRequest('api/baker/suppliers/hide-or-show', {
    bakerId,
    supplierId,
  })
}
