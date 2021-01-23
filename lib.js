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

export async function getModelDetails(ingredientName) {
  if (ingredientName === 'cheese') {
    return [
      {
        image: '/images/mozarella.png',
        name: 'Model A',
        amount: '100 Kg',
        price: '3€',
      },
      {
        image: '/images/cheddar.png',
        name: 'Model B',
        amount: '100 Kg',
        price: '3€',
      },
      {
        name: 'Model C',
        image: '/images/gouda.png',
        amount: '100 Kg',
        price: '3€',
      },
    ]
  }
  return [
    {
      amount: '100 Kg',
      price: '3€',
    },
  ]
}

export async function getIngredients() {
  return [
    {
      name: 'Cheese',
      image: '/images/cheese.jpg',
      models: await getModelDetails('cheese'),
      isHidden: false,
    },
    {
      name: 'Bacon',
      image: '/images/bacon.png',
      models: await getModelDetails('bacon'),
      isHidden: false,
    },
    {
      name: 'Pineapple',
      image: '/images/pineapple.jpg',
      models: await getModelDetails('pineapple'),
      isHidden: true,
    },
    {
      name: 'Mushroom',
      image: '/images/mushroom.jpg',
      models: await getModelDetails('mushroom'),
      isHidden: false,
    },
    {
      name: 'Olive',
      image: '/images/olive.png',
      models: await getModelDetails('olive'),
      isHidden: false,
    },
  ]
}

export async function getSuppliers() {
  return [
    {
      id: '231231232',
      name: 'Wayne Enterprise',
      address: 'Abdullapurstraße 6969, Chemnitz',
      image: '/images/wayne.png',
      isHidden: false,
    },
    {
      id: '421312321',
      name: 'Los Pollos Hermanos',
      address: 'Abdullapurstraße 6969, Chemnitz',
      image: '/images/polos.png',
      isHidden: false,
    },
    {
      id: '32131',
      name: 'Overlook Hotel',
      address: 'Abdullapurstraße 6969, Chemnitz',
      image: '/images/overlook.jpg',
      isHidden: true,
    },
    {
      id: '4214123',
      name: 'Don Corleone Foundation',
      address: 'Abdullapurstraße 6969, Chemnitz',
      image: '/images/corleone.jpg',
      isHidden: false,
    },
    {
      id: '41231232',
      name: 'Forrest Gump GmbH',
      address: 'Abdullapurstraße 6969, Chemnitz',
      image: '/images/gump.png',
      isHidden: false,
    },
  ]
}
