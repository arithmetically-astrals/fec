# Astral Plane

### Overview

The Astral Plane project is an e-commerce site that was made with React and Express following a business requirements document and uses an API provided by the project stakeholders. Our team was tasked to create a dynamic and modern user interface to enhance the client experience. We challenged ourselves to use technologies that were new to us such as React hooks, Sass, and Jest. To keep our workflow organized we used daily stand-up meetings along with Trello to keep track of individual engineers' progress and used Git workflow techniques along with code reviews/testing to keep our code stable.

# Table of Contents

- [Features](#features)
  - [Product Overview](#product-overview)
  - [Related items](#related-items)
  - [Questions & Answers](#questions-&-answers)
  - [Ratings & Reviews](#ratings-&-reviews)
- [Tech Stack](#tech-stack)
- [Development](#development)
  - [Pre-Installation Requirements](#pre-installation-requirements)
  - [Environment Variables Management](#environment-variables-management)
  - [Installation](#installation)
- [Deployment](#deployment)
- [Lighthouse](#lighthouse)
- [Contributors](#contributors)

# Features

## Product Overview

The overview section contains three major components: a carousel of images of the current product, a panel with information about the current product, and a long text description of the current product. Within the carousel, there is one main image and any number of thumbnail images arrated on the left side of the main image. Within the information panel, there is the product's name, price, style selector, size selector, quantity selector, add to cart button, and add to favorites button. The long product description comes below the carousel and information panel and contains a long text description with details of the item.

## Related Items

The Related Products carousel displays a list of products related to the main product, while the Outfit List carousel is unique to each user, only displaying the products that have been added by the user. 

This widget includes:
  1. Scroll functionality and a dynamically rendered comparison table modal for the related products carousel
    1a. Conditionally rendered scroll buttons that appear for overflow of the product list and deactivate when there are no more products to scroll through
  3. Upon clicking the Add to Outfit button, the current product is added to the Outfit List carousel 
    3a. This Outfit List data will persist through user page reloads and/or navigation to other product pages because of the use of the browser's localStorage
    3b. Upon clicking the 'X' delete button on an Outfit List item, that product will be removed from the Outfit List carousel (as well as the browser's localStorage)
    
## Questions & Answers

![Q A](https://user-images.githubusercontent.com/108149399/189500041-323b980f-94d2-48c7-bb39-192bd847bb39.png)

This section allows the user to view and interact with the questions and answers for a given product. The user can use a query and search for a question in the product regardless of whether it is rendered or not, and the app will return a list of questions that match that query and highlight the matched area for increased visibility. The user can see more questions or answers by clicking buttons, and mark questions or answers as helpful. They can also report answers, which will be marked in the API as such and will no longer be rendered for future page loads. The user can click an image to see a modal of that image at full resolution. Finally, the user has the ability to add questions and answers by clicking on their respective buttons, which will open a modal asking them for valid and respective inputs. After submitting their information, the new question or answer will be displayed on the page.

## Ratings & Reviews

![Screen Shot 2022-09-10 at 9 30 28 AM](https://user-images.githubusercontent.com/103958999/189490719-c424128d-79d1-48b0-b19c-a1abf0c116e4.jpeg)

All of the collective meta review information is held in the upper left side while the list of reviews will either sit on the right side or flex underneath depending on the users screen width. Users can vote once on if a review was helpful or report the review for inspection by a moderator. Sorting and searching reviews is also available. A user can also add a new review to the page through the button that will open a modal that will allow a user to input their ratings, summary, pictures, and main body of the review that will be rendered on the page once it has been submitted.

# Tech Stack

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)
![Jest](https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white)
![Testing-Library](https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white)
![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)
![Babel](https://img.shields.io/badge/Babel-F9DC3e?style=for-the-badge&logo=babel&logoColor=black)
![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

# Development

## Pre-Installation Requirements

```
Node v16.14.2
NPM v8.5.0
```

## Environment Variables Management

This project uses [dotenv](https://github.com/motdotla/dotenv).

The environment variables needed are inside the .example-env file. Simply copy the file, remove the 'example-' part of the file name, and input the required values of your access token, hackreactor cohort code, and port number you wish to use.

## Installation

Installs dependencies
```
npm install
```
Compiles code
```
npm start
```
Starts server
```
npm run dev-server
```

# Deployment

Will add deployed page in the future!

# Lighthouse

![Screen Shot of lighthouse report](https://user-images.githubusercontent.com/103958999/189490868-c61e6d32-c957-4883-b772-e6d293e27785.jpeg)

# Contributors

Team Arithmetically Astrals\
Product Overview - [Casey Penk](https://github.com/caseypenk)\
Related Items - [Daniel Elliott](https://github.com/delliott33)\
Questions & Answers - [Joseph Chou](https://github.com/JosephChou124)\
Ratings & Reviews - [Brian Vose](https://github.com/Banzubie)
