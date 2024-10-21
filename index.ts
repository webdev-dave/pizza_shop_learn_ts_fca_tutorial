type Pizza = {
  name: string;
  price: number;
};

type Order = {
  pizza: Pizza;
  status: string;
  orderId: number;
};

const menu = [
  { name: "Margherita", price: 8 },
  { name: "Pepperoni", price: 10 },
  { name: "Hawaiian", price: 10 },
  { name: "Veggie", price: 9 },
];

let cashInRegister = 100;

let nextOrderId = 1;
const orderQueue: Order[] = [];

function addNewPizza(pizzaObj: Pizza) {
  menu.push(pizzaObj);
}

function placeOrder(pizzaName: string) {
  const pizza = menu.find((pizza) => pizza.name === pizzaName);
  if (!pizza) {
    console.log("Pizza not found in menu");
    return;
  }

  cashInRegister += pizza.price;
  const newOrder = {
    pizza: pizza,
    status: "ordered",
    orderId: nextOrderId++,
  };
  orderQueue.push(newOrder);
  return newOrder;
}

function completeOrder(orderId: number) {
  const order = orderQueue.find((order) => order.orderId === orderId);
  if (!order){
    console.log("Order not found");
    return;
  };

  order.status = "completed";
  return order;
}

addNewPizza({ name: "Meat Lovers", price: 12 });
addNewPizza({ name: "Gluten Free", price: 11 });
addNewPizza({ name: "Sicilian", price: 9 });

placeOrder("Margherita");
completeOrder(1);

console.log("Menu:", menu);
console.log("Cash in register:", cashInRegister);
console.log("Order queue:", orderQueue);
