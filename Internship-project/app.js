// 1. Setup Connection (Fill these with your keys from Supabase Settings > API)
const SUPABASE_URL = "https://qtydypbuegkbpqcmtrds.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_sZVLC3CZ53nnI6CXnJL-2w_7429Lpgq";
const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const wrapper = document.querySelector(".sliderWrapper");
const menuItems = document.querySelectorAll(".menuItem");

const products = [
  {
    id: 1,
    title: "Air Force",
    price: 119,
    colors: [
      { code: "black", img: "./img/air.png" },
      { code: "darkblue", img: "./img/air2.png" },
    ],
  },
  {
    id: 2,
    title: "Air Jordan",
    price: 149,
    colors: [
      { code: "lightgray", img: "./img/jordan.png" },
      { code: "green", img: "./img/jordan2.png" },
    ],
  },
  {
    id: 3,
    title: "Blazer",
    price: 109,
    colors: [
      { code: "lightgray", img: "./img/blazer.png" },
      { code: "green", img: "./img/blazer2.png" },
    ],
  },
  {
    id: 4,
    title: "Crater",
    price: 129,
    colors: [
      { code: "black", img: "./img/crater.png" },
      { code: "lightgray", img: "./img/crater2.png" },
    ],
  },
  {
    id: 5,
    title: "Hippie",
    price: 99,
    colors: [
      { code: "gray", img: "./img/hippie.png" },
      { code: "black", img: "./img/hippie2.png" },
    ],
  },
];

let choosenProduct = products[0];

const currentProductImg = document.querySelector(".productImg");
const currentProductTitle = document.querySelector(".productTitle");
const currentProductPrice = document.querySelector(".productPrice");
const currentProductColors = document.querySelectorAll(".color");
const currentProductSizes = document.querySelectorAll(".size");

menuItems.forEach((item, index) => {
  item.addEventListener("click", () => {
    //change the current slide
    wrapper.style.transform = `translateX(${-100 * index}vw)`;

    //change the choosen product
    choosenProduct = products[index];

    //change texts of currentProduct
    currentProductTitle.textContent = choosenProduct.title;
    currentProductPrice.textContent = "$" + choosenProduct.price;
    currentProductImg.src = choosenProduct.colors[0].img;

    //assing new colors
    currentProductColors.forEach((color, index) => {
      color.style.backgroundColor = choosenProduct.colors[index].code;
    });
  });
});

currentProductColors.forEach((color, index) => {
  color.addEventListener("click", () => {
    currentProductImg.src = choosenProduct.colors[index].img;
  });
});

currentProductSizes.forEach((size, index) => {
  size.addEventListener("click", () => {
    currentProductSizes.forEach((size) => {
      size.style.backgroundColor = "white";
      size.style.color = "black";
    });
    size.style.backgroundColor = "black";
    size.style.color = "white";
  });
});

const productButton = document.querySelector(".productButton");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");
const payButton = document.querySelector(".payButton"); // Added this to target the checkout button

productButton.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// --- NEW BACKEND STUFF ---
payButton.addEventListener("click", async () => {
  // Get values from the modal inputs
  const name = document.querySelector(".payInput[placeholder='John Doe']").value;
  const phone = document.querySelector(".payInput[placeholder='+1 234 5678']").value;
  const address = document.querySelector(".payInput[placeholder='Elton St 21 22-145']").value;

  // Basic validation to ensure fields aren't empty
  if (!name || !phone || !address) {
    alert("Please fill out all the details!");
    return;
  }

  // 2. Insert data into Supabase 'orders' table
  const { data, error } = await supabaseClient
    .from('orders') 
    .insert([
      { 
        product: choosenProduct.title, 
        amount: choosenProduct.price,
        customer_name: name,
        phone_number: phone,
        address: address
      }
    ]);

  if (error) {
    alert("Error placing order: " + error.message);
  } else {
    alert("Success! Your " + choosenProduct.title + " order has been saved.");
    payment.style.display = "none";
  }
});