# Parcel Tracking App

## Table of Contents

-  [Introduction](#introduction)
-  [Technologies Used](#technologies-used)
-  [Application Modules](#application-modules)
   -  [Authentication](#authentication)
   -  [Home Page](#home-page)
-  [Firebase Realtime Database](#firebase-realtime-database)

---

## Introduction

Since I'm a frontend developer and not familiar with Node.js, I relied on Firebase service to mock the database and APIs. I'm familiar with REST APIs and have built many apps with them, but I don't create the APIs themselves. This README provides an overview of the Parcel Tracking App, a web application developed using Firebase, Mantin UI, and React Router DOM. The app is designed to enable users to track parcels, create parcels, and interact with parcel data based on their user type (Sender or Biker).

## Technologies Used

The application utilizes the following external packages and libraries:

1. **Firebase**: Firebase is employed to mock the database and APIs, providing authentication and real-time data synchronization.
2. **Mantin UI**: Mantin UI is used to build the user interface of the application, ensuring a clean and user-friendly design.
3. **React Router DOM**: React Router DOM is employed for handling routing within the application, enabling smooth navigation between different views.

## Application Modules

The Parcel Tracking App consists of two main modules:

### Authentication

In the Authentication module, users can perform the following actions:

-  **Login**: Users can log in using their credentials.
-  **Signup**: New users can create an account by specifying their user type (Biker or Sender) during registration.
-  **Reset Password**: Users have the option to reset their password if they forget it.

### Home Page

The Home Page module offers different functionalities based on the user's type (Sender or Biker):

#### Sender Features:

-  **Create Parcel**: Senders can create parcels and input relevant details.
-  **Track Parcel**: Senders can track the status of their parcels, including whether they have been picked up and view information about the assigned biker.
-  **Delete Parcel**: Senders have the option to delete a parcel if it has not yet been picked up.

#### Biker Features:

-  **View Submitted Parcels**: Bikers can see a list of all submitted parcels and their details.
-  **Pick Parcel**: Bikers can pick up parcels that are available for delivery.
-  **Drop Parcel**: Bikers can drop off parcels and enter the timestamp on delivery.
-  **View Completed Parcels**: Bikers can access a list of all parcels they have successfully delivered.

## Firebase Realtime Database

The Parcel Tracking App relies on Firebase Realtime Database, which offers real-time data synchronization across all clients. This means that data updates are immediately reflected in the application without the need to refresh the page. Real-time data synchronization is crucial for the app's functionality, especially for bikers who need to access the latest parcel data.
