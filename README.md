# Express, Node, Mongoose, MongoDB CRUD RESTful API

## Description

This package contains a RESTful API server running on Node to store personal library data on a mongDB database. The database in the project is run in a docker container and Mongoose is used as an ODM to simplify working with the database with node by using a schema model system. Express handles the routing for the server to allow Creating, Reading, Updating and Deleting of data from the data base.

This was designed to work with the Vue front end package [link]. This is half of my MEVN Library project.

## Table of Contents

- [Description](#description)

## Installation

Confirm mongodb is installed. The server will fail to start after installation if mongodb isn't running. It works with Atlas, self hosted and the mongodb docker image.

Change to the "backend" folder:

- `cd backend`

Then:

- `npm install`

### Start Server

Start your Mongo image or DB and fill out the secrets for your database in your own secrets file following the model.

- [Secrets Template link]

Then start the server:

- `node server`

## Usage

## License

Licensed under the [MIT](LICENSE) license.
