//------------------------------ Explicitly typed generic functions example

// const gameScores = [14, 21, 33, 42, 59];
// const favoriteThings = [
//   "raindrops on roses",
//   "whiskers on kittens",
//   "bright copper kettles",
//   "warm woolen mittens",
// ];
// const voters = [
//   { name: "Alice", age: 42 },
//   { name: "Bob", age: 77 },
// ];
// const mixedArray: (string | number | boolean)[] = ["hello", 42, true];
// function getLastItem<GenericType>(
//   array: GenericType[]
// ): GenericType | undefined {
//   return array[array.length - 1];
// }

// console.log(getLastItem<number>(gameScores));
// console.log(getLastItem<string>(favoriteThings));
// console.log(getLastItem<{ name: string; age: number }>(voters));
// console.log(getLastItem(mixedArray));

// --------------------------------------------------------

type Pizza = {
  id: number;
  name: string;
  price: number;
};

type Order = {
  pizza: Pizza;
  status: "ordered" | "completed";
  orderId: number;
};

let nextPizzaId = 1;
const menu: Pizza[] = [
  { id: nextPizzaId++, name: "Margherita", price: 8 },
  { id: nextPizzaId++, name: "Pepperoni", price: 10 },
  { id: nextPizzaId++, name: "Hawaiian", price: 10 },
  { id: nextPizzaId++, name: "Veggie", price: 9 },
];

let cashInRegister = 100;
let nextOrderId = 1;
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Omit<Pizza, "id">): Pizza {
  menu.push({ ...pizzaObj, id: nextPizzaId++ });
  return menu[menu.length - 1];
}

function placeOrder(pizzaName: string): Order | undefined {
  const pizza = menu.find((pizza) => pizza.name === pizzaName);
  if (!pizza) {
    console.log("Pizza not found in menu");
    return;
  }

  cashInRegister += pizza.price;
  const newOrder: Order = {
    pizza: pizza,
    status: "ordered",
    orderId: nextOrderId++,
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number): Order | undefined {
  const order = orderQueue.find((order) => order.orderId === orderId);
  if (!order) {
    console.log("Order not found");
    return;
  }

  order.status = "completed";
  return order;
}

function getPizzaDetail(identifier: number | string): Pizza | undefined {
  if (typeof identifier === "number") {
    return menu.find((pizza) => pizza.id === identifier);
  } else if (typeof identifier === "string") {
    return menu.find(
      (pizza) => pizza.name.toLowerCase() === identifier.toLowerCase()
    );
  } else {
    console.log("Invalid identifier");
    throw new Error("Invalid identifier");
  }
}

addNewPizza({ name: "Meat Lovers", price: 12 });
addNewPizza({ name: "Gluten Free", price: 11 });
addNewPizza({ name: "Sicilian", price: 9 });

placeOrder("Margherita");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
