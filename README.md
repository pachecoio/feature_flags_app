# feature_flags_app
Feature flags manager web app

## Get started

### Requirements

- Node.js
- Docker (optional)

### Run the app locally

Install the dependencies
```
npm i
```

Then run the application with npm
```
npm run dev
```

You can also run the app with docker (only production image ready so far)
```
docker build -t <IMAGE NAME> .

docker run -p 80:80 <IMAGE NAME>
```
