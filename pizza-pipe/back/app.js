let orders = [
  (pizza1 = {
    dough: false,
    toppings: ["1", "2", "3", "4"],
    baked: false,
    served: false,
  }),
  (pizza2 = {
    dough: false,
    toppings: [],
    baked: false,
    served: false,
  }),
  //   (pizza3 = {
  //     dough: false,
  //     toppings: ["1", "2"],
  //     baked: false,
  //     served: false,
  //   }),
  //   (pizza4 = {
  //     dough: false,
  //     toppings: ["1", "2", "3", "4"],
  //     baked: false,
  //     served: false,
  //   }),
];

const doughAvailable = []; // max 2
const toppingAvailable = []; // max 3
const waitersAvailable = []; // max 2
const waitingForToppings = []; // queue for toppings
const waitingForOven = []; // queue for the oven
let ovenIsFree = [];
let numOfTop;
const process = () => {
  const doughManager = setInterval(() => {
    if (doughAvailable.length < 2 && orders.length > 0) {
      console.log("your pizza dough is in the making!");
      let currentPizza = orders.shift();
      doughAvailable.push(currentPizza);
      dough(currentPizza);
    }
  }, 1000);

  const toppingsManager = setInterval(() => {
    if (toppingAvailable.length < 3 && waitingForToppings.length > 0) {
      console.log("your pizza is now in the toppings process");
      let currentPizza = waitingForToppings.shift();
      toppingAvailable.push(currentPizza);
      toppings(currentPizza);
    }
  }, 1000);

  const ovenManager = setInterval(() => {
    if (ovenIsFree.length === 0 && waitingForOven.length > 0) {
      let currentPizza = waitingForOven.shift();
      ovenIsFree.push(currentPizza);
      console.log("your pizza is in the oven");
      oven(currentPizza);
    }
  }, 1000);
};

const dough = (currentPizza) => {
  setTimeout(() => {
    currentPizza.dough = true;
    if (toppingAvailable.length < 3) {
      toppingAvailable.push(currentPizza);
      console.log("dough is ready moving to toppings!");
      toppings(currentPizza);
      doughAvailable.shift();
    } else {
      waitingForToppings.push(currentPizza);
      console.log("dough is ready, waiting for a chef to be available");
      doughAvailable.shift();
    }
  }, 7000);
};
const toppings = (currentPizza) => {
  if (currentPizza.toppings.length === 0) {
    numOfTop = 0;
  }
  if (currentPizza.toppings.length % 2 !== 0) {
    numOfTop = (currentPizza.toppings.length + 1) / 2;
  } else {
    numOfTop = currentPizza.toppings.length / 2;
  }
  setTimeout(() => {
    if (ovenIsFree.length === 0) {
      ovenIsFree.push(currentPizza);
      toppingAvailable.shift();
      console.log("toppings process finished, your pizza is in the oven");
      oven(currentPizza);
    } else {
      console.log(
        "toppings process finished, oven is full wait for your pizza"
      );
      waitingForOven.push(currentPizza);
      toppingAvailable.shift();
    }
  }, numOfTop * 4000);
};

const oven = (currentPizza) => {
  setTimeout(() => {
    currentPizza.baked = true;
    console.log("your pizza is ready, waiting to serve");
    ovenIsFree.shift();
    serve(currentPizza);
  }, 10000);
};
const serve = (currentPizza) => {
  setTimeout(() => {
    currentPizza.served = true;
    console.log("your pizza has been served");
    console.log(currentPizza);
  }, 5000);
};

process();
