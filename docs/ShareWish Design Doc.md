# ShareWish
## _The universal wishlist_

Creating a full Tailwind CSS-based theme for a web app is beyond the scope of this text-based platform, but I can provide you with some sample code snippets for each of the pages you've mentioned. These are basic mockups and can be extended further to suit your needs.

### Sign In Page

```html
<!DOCTYPE html>
<html>
<head>
  <title>Sign In</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="bg-gray-200 h-screen flex justify-center items-center">
  <div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
    <h1 class="text-2xl mb-4">Sign In</h1>
    <form>
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-2">Email</label>
        <input class="w-full p-2 border rounded" type="email">
      </div>
      <div class="mb-4">
        <label class="block text-sm font-semibold mb-2">Password</label>
        <input class="w-full p-2 border rounded" type="password">
      </div>
      <button class="w-full bg-blue-500 text-white p-2 rounded">Sign In</button>
    </form>
  </div>
</body>
</html>
```

### Sign Up Page

You can use the same structure as the Sign In page but add an additional field for "Confirm Password".

### Profile Page

```html
<!-- Add this inside a suitable container -->
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
  <h1 class="text-2xl mb-4">Profile</h1>
  <p><strong>Name:</strong> John Doe</p>
  <p><strong>Email:</strong> john.doe@example.com</p>
  <button class="bg-blue-500 text-white p-2 rounded mt-4">Edit Profile</button>
</div>
```

### Wishlist CRUD Page

```html
<!-- Add this inside a suitable container -->
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
  <h1 class="text-2xl mb-4">Wishlist</h1>
  <ul>
    <li class="border-b pb-2 mb-2">
      <p>Item 1</p>
      <button class="text-red-500 text-sm">Delete</button>
    </li>
    <li class="border-b pb-2 mb-2">
      <p>Item 2</p>
      <button class="text-red-500 text-sm">Delete</button>
    </li>
  </ul>
  <button class="bg-blue-500 text-white p-2 rounded mt-4">Add New Item</button>
</div>
```

These are very basic examples and don't cover all the functionalities you might need, but they should give you a good starting point. You can extend these by adding more Tailwind classes or custom styles.


Certainly! Below is a simple example of a layout using Tailwind CSS that includes a header, footer, and main content components. Each component's code is provided separately for clarity.

### Header Component

```html
<!-- Header Component -->
<div class="bg-blue-500 text-white p-4">
  <h1 class="text-2xl">My Web App</h1>
</div>
```

### Main Content Component

```html
<!-- Main Content Component -->
<div class="bg-gray-100 p-4 min-h-screen">
  <h2 class="text-xl mb-4">Main Content</h2>
  <p>This is the main content of the page.</p>
</div>
```

### Footer Component

```html
<!-- Footer Component -->
<div class="bg-gray-800 text-white p-4">
  <p>Copyright © 2023 My Web App</p>
</div>
```

### Putting It All Together

Here's how you can put all these components together to form a complete layout:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Web App</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="flex flex-col min-h-screen">

  <!-- Header Component -->
  <div class="bg-blue-500 text-white p-4">
    <h1 class="text-2xl">My Web App</h1>
  </div>

  <!-- Main Content Component -->
  <div class="bg-gray-100 p-4 flex-grow">
    <h2 class="text-xl mb-4">Main Content</h2>
    <p>This is the main content of the page.</p>
  </div>

  <!-- Footer Component -->
  <div class="bg-gray-800 text-white p-4">
    <p>Copyright © 2023 My Web App</p>
  </div>

</body>
</html>
```

In this example, I've used Tailwind CSS for styling. The layout consists of a header at the top, a footer at the bottom, and a main content area that takes up the remaining space. The `flex-grow` class ensures that the main content expands to fill the available space, pushing the footer to the bottom.


To support light and dark modes in a Tailwind CSS project, you can use the `dark` variant provided by Tailwind. Below are the steps to set up light and dark modes:

### 1. Update Tailwind Config

First, you'll need to extend your Tailwind configuration to enable dark mode. You can choose between `class` and `media` strategies. The `class` strategy toggles dark mode based on a `.dark` class on a parent element, while the `media` strategy uses the `(prefers-color-scheme: dark)` media query.

Here's how to enable dark mode using the `class` strategy:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class', // or 'media'
  // ...other configs
}
```

### 2. Add Toggle Functionality

To toggle between light and dark modes, you can add a button that toggles a `.dark` class on the `html` or `body` element. Here's a simple example using vanilla JavaScript:

```html
<button id="toggleDarkMode">Toggle Dark Mode</button>

<script>
  document.getElementById('toggleDarkMode').addEventListener('click', function() {
    document.documentElement.classList.toggle('dark');
  });
</script>
```

### 3. Style Components for Dark Mode

You can now use the `dark:` variant to style your components differently in dark mode. For example:

```html
<!-- Light mode -->
<div class="bg-white text-black">
  <!-- Content -->
</div>

<!-- Dark mode -->
<div class="dark:bg-gray-800 dark:text-white">
  <!-- Content -->
</div>
```

### 4. Global Styles for Light and Dark Modes

You can also set global styles for light and dark modes in your stylesheet:

```css
/* Global styles for light mode */
body {
  @apply bg-white text-black;
}

/* Global styles for dark mode */
body.dark {
  @apply bg-gray-800 text-white;
}
```

### 5. Optional: Automatically Match System Theme

If you're using the `media` strategy, Tailwind will automatically switch to dark mode based on the user's system preference. If you're using the `class` strategy but still want to match the system theme initially, you can use JavaScript:

```javascript
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
```

By following these steps, you should be able to support both light and dark modes in your Tailwind CSS project.


Certainly! Below are the dark mode versions of the components you've mentioned, using Tailwind CSS. The `dark:` variant is used to specify styles that should be applied when the `.dark` class is present on a parent element (usually the `html` or `body` element).

### Header Component (Dark Mode)

```html
<!-- Header Component -->
<div class="bg-blue-500 text-white p-4 dark:bg-blue-900">
  <h1 class="text-2xl">My Web App</h1>
</div>
```

### Main Content Component (Dark Mode)

```html
<!-- Main Content Component -->
<div class="bg-gray-100 p-4 min-h-screen dark:bg-gray-800 dark:text-gray-300">
  <h2 class="text-xl mb-4">Main Content</h2>
  <p>This is the main content of the page.</p>
</div>
```

### Footer Component (Dark Mode)

```html
<!-- Footer Component -->
<div class="bg-gray-800 text-white p-4 dark:bg-gray-900">
  <p>Copyright © 2023 My Web App</p>
</div>
```

### Sign In Page (Dark Mode)

```html
<!-- Sign In Page -->
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-800 dark:text-gray-300">
  <h1 class="text-2xl mb-4">Sign In</h1>
  <form>
    <div class="mb-4">
      <label class="block text-sm font-semibold mb-2 dark:text-gray-400">Email</label>
      <input class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" type="email">
    </div>
    <div class="mb-4">
      <label class="block text-sm font-semibold mb-2 dark:text-gray-400">Password</label>
      <input class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300" type="password">
    </div>
    <button class="w-full bg-blue-500 text-white p-2 rounded dark:bg-blue-700">Sign In</button>
  </form>
</div>
```

### Profile Page (Dark Mode)

```html
<!-- Profile Page -->
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-md dark:bg-gray-800 dark:text-gray-300">
  <h1 class="text-2xl mb-4">Profile</h1>
  <p><strong>Name:</strong> John Doe</p>
  <p><strong>Email:</strong> john.doe@example.com</p>
  <button class="bg-blue-500 text-white p-2 rounded mt-4 dark:bg-blue-700">Edit Profile</button>
</div>
```

### Wishlist CRUD Page (Dark Mode)

```html
<!-- Wishlist CRUD Page -->
<div class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg dark:bg-gray-800 dark:text-gray-300">
  <h1 class="text-2xl mb-4">Wishlist</h1>
  <ul>
    <li class="border-b pb-2 mb-2 dark:border-gray-600">
      <p>Item 1</p>
      <button class="text-red-500 text-sm dark:text-red-400">Delete</button>
    </li>
    <li class="border-b pb-2 mb-2 dark:border-gray-600">
      <p>Item 2</p>
      <button class="text-red-500 text-sm dark:text-red-400">Delete</button>
    </li>
  </ul>
  <button class="bg-blue-500 text-white p-2 rounded mt-4 dark:bg-blue-700">Add New Item</button>
</div>
```

These are the dark mode versions of the components. You can toggle between light and dark modes by adding or removing the `.dark` class to a parent element, typically the `html` or `body` element.


Certainly! Based on the features you've described, here's a breakdown of the frontend pages and backend routes you might need for your wishlist app.

### Frontend Pages:

1. **Landing Page**: A welcome page with an option to sign in or sign up.
2. **Sign In Page**: For user authentication.
3. **Sign Up Page**: For new user registration.
4. **Dashboard**: To display all the user's lists.
5. **List Page**: To display all items within a specific list.
6. **Create/Edit List Page**: To create a new list or edit an existing one.
7. **Add/Edit Item Page**: To add a new item to a list or edit an existing one.
8. **Public Lists Page**: To display lists that are publicly shared.
9. **Shared List Page**: To display a list that has been shared with the user.
10. **Settings Page**: To control account settings and list/item access.
11. **Shared With Me Page**: To display lists that others have shared with the user.
12. **Public Item Details Page**: To display details of a publicly shared item.

### Backend Routes:

#### Authentication:

1. `POST /auth/signup`: Register a new user.
2. `POST /auth/signin`: Authenticate an existing user.

#### Lists:

1. `GET /lists`: Fetch all lists for the authenticated user.
2. `POST /lists`: Create a new list.
3. `GET /lists/:listId`: Fetch a specific list.
4. `PUT /lists/:listId`: Update a specific list.
5. `DELETE /lists/:listId`: Delete a specific list.
6. `GET /lists/public`: Fetch all publicly shared lists.
7. `GET /lists/shared`: Fetch all lists shared with the authenticated user.

#### Items:

1. `GET /lists/:listId/items`: Fetch all items in a specific list.
2. `POST /lists/:listId/items`: Add a new item to a list.
3. `GET /lists/:listId/items/:itemId`: Fetch a specific item.
4. `PUT /lists/:listId/items/:itemId`: Update a specific item.
5. `DELETE /lists/:listId/items/:itemId`: Delete a specific item.
6. `POST /lists/:listId/items/fetch`: Fetch item details from a URL.

#### Sharing:

1. `POST /lists/:listId/share`: Share a list with another user.
2. `DELETE /lists/:listId/unshare`: Unshare a list.
3. `POST /lists/:listId/items/:itemId/share`: Share an item publicly.
4. `DELETE /lists/:listId/items/:itemId/unshare`: Unshare an item.

#### User Settings:

1. `GET /users/me`: Fetch the authenticated user's details.
2. `PUT /users/me`: Update the authenticated user's details.

This is a high-level overview and you might need to add more routes or pages as you go along, especially for features like notifications, activity logs, or if you plan to add more complex functionalities.



Certainly! Below is a sample code for a landing page using Tailwind CSS, incorporating all the elements you've mentioned.

### Landing Page Design

```html
<!DOCTYPE html>
<html>
<head>
  <title>WishMate - Your Universal Wishlist</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css" rel="stylesheet">
</head>
<body class="flex flex-col min-h-screen dark:bg-gray-800">

  <!-- Header Component -->
  <div class="bg-blue-500 text-white p-4 dark:bg-blue-900">
    <h1 class="text-2xl">
      <img src="logo.png" alt="WishMate Logo" class="inline-block mr-2"> WishMate
    </h1>
  </div>

  <!-- Main Content Component -->
  <div class="bg-gray-100 p-4 flex-grow dark:bg-gray-800 dark:text-gray-300">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl mb-4">Your Universal Wishlist, All in One Place</h2>
      <p class="text-lg mb-8">
        WishMate helps you keep track of all your wishlist items from multiple platforms. Share your wishes easily and get the perfect gifts every time!
      </p>
      <div>
        <a href="/signin" class="bg-blue-500 text-white p-2 rounded mr-4 dark:bg-blue-700">Sign In</a>
        <a href="/signup" class="bg-green-500 text-white p-2 rounded dark:bg-green-700">Sign Up</a>
      </div>
    </div>
  </div>

  <!-- Footer Component -->
  <div class="bg-gray-800 text-white p-4 dark:bg-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-lg">
          <img src="logo.png" alt="WishMate Logo" class="inline-block mr-2"> WishMate
        </h1>
        <p>Copyright © 2023 WishMate</p>
      </div>
      <div>
        <a href="#" class="mr-4">Terms</a>
        <a href="#" class="mr-4">Privacy</a>
        <a href="#" class="mr-4">Credits</a>
      </div>
      <div>
        <a href="#" class="mr-4"><img src="facebook-icon.png" alt="Facebook"></a>
        <a href="#" class="mr-4"><img src="twitter-icon.png" alt="Twitter"></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram"></a>
      </div>
    </div>
  </div>

</body>
</html>
```

### Explanation:

- **Header**: Contains the title and logo of the app. You can replace the `logo.png` with your actual logo.
- **Main Content**: Includes a hero title, tagline, and description. It also has links to the Sign In and Sign Up pages.
- **Footer**: Contains the title, copyright information, footer links, and social media handles. Replace the social media icons (`facebook-icon.png`, `twitter-icon.png`, `instagram-icon.png`) with actual images or SVGs.

This is a basic example and can be extended further to suit your needs. You can also toggle between light and dark modes by adding or removing the `.dark` class to the `html` or `body` element.



Certainly! To add a carousel for multiple use cases, you can use a simple JavaScript library like [Tiny Slider](https://github.com/ganlanyuan/tiny-slider) or build your own carousel using Tailwind CSS and JavaScript. Below is an example using Tailwind CSS and vanilla JavaScript to create a simple carousel for use cases.

### Landing Page with Carousel for Use Cases

```html
<!DOCTYPE html>
<html>
<head>
  <title>WishMate - Your Universal Wishlist</title>
  <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.7/dist/tailwind.min.css" rel="stylesheet">
  <style>
    .carousel-hidden {
      display: none;
    }
  </style>
</head>
<body class="flex flex-col min-h-screen dark:bg-gray-800">

  <!-- Header Component -->
  <div class="bg-blue-500 text-white p-4 dark:bg-blue-900">
    <h1 class="text-2xl">
      <img src="logo.png" alt="WishMate Logo" class="inline-block mr-2"> WishMate
    </h1>
  </div>

  <!-- Main Content Component -->
  <div class="bg-gray-100 p-4 flex-grow dark:bg-gray-800 dark:text-gray-300">
    <div class="container mx-auto text-center">
      <h2 class="text-4xl mb-4">Your Universal Wishlist, All in One Place</h2>
      <p class="text-lg mb-8">
        WishMate helps you keep track of all your wishlist items from multiple platforms. Share your wishes easily and get the perfect gifts every time!
      </p>
      <div id="carousel" class="relative">
        <div class="carousel-item">
          <h3 class="text-2xl mb-4">Use Case 1: Birthday Gifts</h3>
          <p>Create a list for your upcoming birthday and share it with your friends and family. Make gifting easier for everyone!</p>
        </div>
        <div class="carousel-item carousel-hidden">
          <h3 class="text-2xl mb-4">Use Case 2: Wedding Registry</h3>
          <p>Planning a wedding? Create a list for your wedding registry and share it with your guests.</p>
        </div>
        <div class="carousel-item carousel-hidden">
          <h3 class="text-2xl mb-4">Use Case 3: Holiday Shopping</h3>
          <p>Keep track of your holiday shopping list and even share it with family to avoid duplicate gifts.</p>
        </div>
        <!-- Add more use cases here -->
      </div>
      <button id="prev" class="bg-gray-500 text-white p-2 rounded mr-4 dark:bg-gray-700">Previous</button>
      <button id="next" class="bg-gray-500 text-white p-2 rounded dark:bg-gray-700">Next</button>
      <div class="mt-8">
        <a href="/signin" class="bg-blue-500 text-white p-2 rounded mr-4 dark:bg-blue-700">Sign In</a>
        <a href="/signup" class="bg-green-500 text-white p-2 rounded dark:bg-green-700">Sign Up</a>
      </div>
    </div>
  </div>

  <!-- Footer Component -->
  <div class="bg-gray-800 text-white p-4 dark:bg-gray-900">
    <div class="container mx-auto flex justify-between items-center">
      <div>
        <h1 class="text-lg">
          <img src="logo.png" alt="WishMate Logo" class="inline-block mr-2"> WishMate
        </h1>
        <p>Copyright © 2023 WishMate</p>
      </div>
      <div>
        <a href="#" class="mr-4">Terms</a>
        <a href="#" class="mr-4">Privacy</a>
        <a href="#" class="mr-4">Credits</a>
      </div>
      <div>
        <a href="#" class="mr-4"><img src="facebook-icon.png" alt="Facebook"></a>
        <a href="#" class="mr-4"><img src="twitter-icon.png" alt="Twitter"></a>
        <a href="#"><img src="instagram-icon.png" alt="Instagram"></a>
      </div>
    </div>
  </div>

  <script>
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carousel-item');

    document.getElementById('next').addEventListener('click', function() {
      slides[currentSlide].classList.add('carousel-hidden');
      currentSlide = (currentSlide + 1) % slides.length;
      slides[currentSlide].classList.remove('carousel-hidden');
    });

    document.getElementById('prev').addEventListener('click', function() {
      slides[currentSlide].classList.add('carousel-hidden');
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      slides[currentSlide].classList.remove('carousel-hidden');
    });
  </script>

</body>
</html>
```

### Explanation:

- The carousel is created using a simple JavaScript logic to toggle the visibility of the use case descriptions.
- The `Previous` and `Next` buttons allow you to navigate through the carousel.
- Each use case is wrapped in a `div` with the class `carousel-item`. The class `carousel-hidden` is used to hide the items initially.

Feel free to replace the placeholder text and images with your actual content. This is a basic example and can be extended further to suit your needs.



Certainly! Here are some additional use cases that you can include in your carousel:

### Use Case 4: Personal Goals

**Text**: "Set up a list for your personal goals, whether it's books you want to read, places you want to visit, or courses you want to take. Keep yourself accountable!"

### Use Case 5: Home Renovation

**Text**: "Planning a home makeover? Create a list of all the furniture, decor, and tools you'll need. Share it with your spouse or roommates to get everyone on the same page."

### Use Case 6: Baby Registry

**Text**: "Expecting a new addition to the family? Make a list of all the baby essentials you'll need and share it with your baby shower guests."

### Use Case 7: Office Supplies

**Text**: "Keep track of all the office supplies you need for your workspace. Share the list with your office manager or purchase them yourself over time."

### Use Case 8: Event Planning

**Text**: "Organizing an event? Create a list of all the things you need—from decorations to food—and share it with your event planning team."

### Use Case 9: Collaborative Projects

**Text**: "Working on a collaborative project? Create a shared list of tasks, materials, or resources needed and ensure everyone is on the same page."

### Use Case 10: Seasonal Shopping

**Text**: "Prepare for seasonal shopping by creating a list of essentials. Share it with family members so everyone knows what's needed."

Feel free to add these to your carousel to provide a more comprehensive overview of the different ways people can use your WishMate app.