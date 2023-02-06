export const getCart = (setState = true) => {
  return fetch("/cart?view=json")
    .then((blob) => blob.json())
    .then((cart) => {
      setState && window.setState("cartState", cart);
      return cart;
    });
};

export const addToCart = ({
  id,
  quantity,
  properties = {},
  sellingPlan = false,
  items = false,
}) => {
  const item = { id, quantity, properties };
  if (sellingPlan) {
    item.selling_plan = sellingPlan;
  }

  return fetch("/cart/add.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      items: items ? items : [item],
    }),
  })
    .then((blob) => blob.json())
    .then(() => getCart(true))
    .then(() => window.setState("cartOpen", true));
};

window.atc = (id) => {
  addToCart({
    id,
    quantity: 1,
  });
};

export const updateCart = ({
  key = false,
  variantID = false,
  quantity = 0,
  attributes = false,
  note = false,
  items = false,
}) => {
  const updatesBody = { updates: {} };

  if (items) {
    items.forEach((item) => {
      updatesBody.updates[item.key] = quantity;
    });
  } else {
    if (variantID) {
      updatesBody.updates[variantID] = quantity;
    }

    if (attributes) {
      updatesBody.attributes = attributes;
    }

    if (key) {
      updatesBody.updates[key] = quantity;
    }

    if (note) {
      updatesBody.note = note;
    }
  }

  return fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatesBody),
  })
    .then((blob) => blob.json())
    .then(() => {
      return getCart(true);
    });
};

export const removeFromCart = (lineItem, setState = true) => {
  return fetch("/cart/change.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: lineItem.key,
      quantity: 0,
    }),
  })
    .then((blob) => blob.json())
    .then((data) => getCart(setState));
};
