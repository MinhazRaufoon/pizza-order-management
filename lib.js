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
        name: 'Model A',
        amount: '100 Kg',
        price: '3€',
      },
      {
        name: 'Model B',
        amount: '100 Kg',
        price: '3€',
      },
      {
        name: 'Model C',
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
  return []
}
