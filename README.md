# Arithmetically Astrals Front End Captstone project

### Overview

The Front End Capstone(FEC) project is an e-commerce site that made with React and Express following a business requirements document and using an API provided by the project stakeholders. Our team was tasked to create a dynamic and modern user interface to enhance the client experience. We challenged ourselves to use technologies that were new to use such as React hooks, Sass, and Jest. To keep our workflow organized we used daily stand-up mettings along with Trello to keep track of individual engineers progress and used Git workflow techniques along with code reviews/testing to keep our code stable.

# Table of Contents

- [Features](#features)
  - [Product Overview](#product-overview)
  - [Related items](#related-items)
  - [Questions & Answers](#questions-&-answers)
  - [Ratings & Reviews](#ratings-&-reviews)
- [Tech Stack](#tech-stack)
- [Development](#developement)
  - [Pre-Installation Requirements](#pre-installation-requirements)
  - [Environment Variables Management](#evirnoment-variables-management)
  - [Installation](#installation)
- [Deployment](#deployment)
- [Lighthouse](#lighthouse)
- [Contributors](#contributors)

# Features

## Light and Dark mode

Insert pictures here

## Product Overview

Add info here

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

Add info here

# Tech Stack

Add tech here

# Development

Add info

## Pre-Installation Requirements

Add info

## Environment Variables Management

Add info

## Installation

Add info

# Deployment

 //(installs dependencies)
//npm install

 //(compiles code)
//npm start

 //(starts server)
//npm run dev-server

# Lighthouse

Add photo here

# Contributors

Team Arithmetically Astrals\
Product Overview - [Casey Penk](https://github.com/caseypenk)\
Related Items - [Daniel Elliott](https://github.com/delliott33)\
Questions & Answers - [Joseph Chou](https://github.com/JosephChou124)\
Ratings & Reviews - [Brian Vose](https://github.com/Banzubie)
