# Angular Sample Dashboard 1

## Getting Started

### Prerequisites

Before you begin, ensure you have `Node.js` and `npm` installed on your machine.
#### Supported node version: v14.20.0 or later, v16.20.0 or later
- Install [Node.js](https://nodejs.org/en) which includes [Node Package Manager] [npm](https://docs.npmjs.com/)
- Install the Angular CLI globally:
```
npm install -g @angular/cli
```

### Installation

1. Clone the repository:
```
git clone https://github.com/gitTechhive/angular-sample-dashboard-1.git
```
2. Navigate to the project directory:
```
cd angular-sample-dashboard-1
```
3. Install dependencies:
```
npm install
```

### Starting the Development Server

To start the development server run:
```
ng serve
``` 

Default port is 4200.
This command will start the development server and automatically open your default browser to [localhost:4200](http://localhost:4200/).

To start the development server with a specific port, run:
```
ng serve --port <selected-port>
```
This command will start the development server on the specified port and automatically open your default browser to `http://localhost:<selected-port>/`.

### Building the Project

To build the project, run:
```
npm run build
```

The build artifacts will be stored in the `dist/` directory.

### Deployment of the Project

Deploying the application can vary depending on your hosting environment. However, typically you would:

Build the project for production using 
```
npm run prod-build
```

Deploy the contents of the `dist/angular-sample-dashboard-1` to your hosting provider.