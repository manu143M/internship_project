👟 The Sneaker Spot | Full-Stack E-Commerce Project

1. Project Introduction
The Sneaker Spot is a full-stack e-commerce landing page created to move beyond static web design. The goal was to build a site that looks professional (frontend) and actually "remembers" when a customer buys something (backend). Instead of just having a "Buy" button that does nothing, we connected it to a cloud database so that every order is saved and can be managed by the store owner.

2. The Frontend Architecture (What the User Sees)
A. HTML5 (The Skeleton)
We used semantic HTML to build a clean structure.

Navigation: A two-tier nav bar with a logo, search bar, and category menu.

The Slider: A container-based system (sliderWrapper) that holds five different product "cards."

The Payment Modal: A hidden div that pops up only when "Buy Now" is clicked, containing a form for personal and card information.

B. CSS3 (The Skin & Animation)
The styling is what makes the site feel "Premium."

Layout: We used Flexbox extensively to align the navigation and the product details.

Visual Flair: We used clip-path to create the sharp, diagonal background shapes behind the shoes.

Responsiveness: We wrote Media Queries to ensure the site looks good on mobile phones by hiding certain elements (like the search bar) and stacking the footer columns.

Smooth Scrolling: Added scroll-behavior: smooth so that clicking "Buy Now" glides the user down to the product section.

C. Vanilla JavaScript (The Brains)
This is where the magic happens. Your app.js handles three main tasks:

The Slider Logic: It listens for clicks on the menu items and calculates exactly how many "Viewports" (vw) to move the slider to show the right shoe.

Product Switching: When you change the shoe, JS instantly swaps the Title, Price, and Image. It also loops through the color options to update the circles on the screen.

The "Bridge": JS collects the data you type into the Payment Modal (Name, Phone, Address) and packages it into an object to send to the backend.

3. The Backend Architecture (How Data is Saved)
Supabase Integration
Instead of building a complicated server from scratch, we used Supabase.

The SDK: We linked a "Client" script in our HTML that acts as the phone line between your computer and the Supabase cloud.

Database Tables: Inside the Supabase Dashboard, we manually created a table named orders. We defined specific "Columns" (customer_name, address, product, etc.) to make sure the data stays organized.

Security (RLS): We navigated the Row Level Security settings. We disabled RLS (or added a public policy) to allow your website to "Insert" new rows into the table without needing a login.

4. The Logic Flow (Step-by-Step)
User Choice: The user picks a shoe (e.g., "Hippie") and clicks "Buy Now."

Modal Popup: The Payment Modal appears. The user enters their shipping address.

The Click: When "Checkout" is clicked, JavaScript runs a function called supabaseClient.from('orders').insert().

The Transaction: The data travels over the internet to your Supabase project.

Confirmation: If everything is correct, the database sends back a "Success" message, and your code shows the alert: "Success! Your order has been saved."

5. Conclusion & Key Challenges Solved
This project proves that you can build a functional store using the "Big Three" of frontend (HTML, CSS, JS) and a modern cloud backend.

Key Challenges we beat:

The Library Error: We fixed the "Supabase is not defined" error by ensuring the CDN script loaded before your custom code.

The Schema Error: We made sure the column names in your JavaScript matched the database names (like address and phone_number) exactly.

The Security Block: We solved the "RLS violation" by configuring permissions in the Supabase dashboard to allow anonymous orders.

Summary of Tech Used:
HTML: Content & Structure.

CSS: Dark-themed UI, Clip-paths, and Mobile Responsiveness.

JavaScript: Slider animation, DOM updates, and API calls.

Supabase: Cloud storage, Table Management, and API Keys.
