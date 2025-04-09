# Folder Structure
Current folder structure of this repository.
```
└── 📁src
    └── 📁assets
        └── react.svg
    └── 📁components
        └── block-quote.tsx
        └── entry-point.tsx
        └── page-routing.tsx
        └── page.tsx
        └── product-card.tsx
        └── search-box.tsx
    └── 📁pages
        └── 📁auth
            └── api.ts
            └── index.tsx
        └── 📁home
            └── api.ts
            └── index.tsx
        └── 📁product-detail
            └── api.ts
            └── 📁components
                └── description.tsx
                └── information.tsx
                └── navigation.tsx
                └── product-review.tsx
                └── review-dialog.tsx
                └── reviews.tsx
            └── index.tsx
        └── 📁splash
            └── index.tsx
    └── 📁shared
        └── axios.ts
        └── 📁config
            └── index.ts
        └── 📁contexts
            └── entry-point.ts
        └── 📁dto
            └── index.ts
        └── 📁history
            └── cursor-history.ts
        └── 📁hooks
            └── useAuth.ts
        └── 📁routes
            └── index.ts
        └── 📁utils
            └── auth.ts
    └── index.css
    └── main.tsx
    └── vite-env.d.ts
```

# Run this project locally
To run this project locally, you will need to follow steps below (from top to bottom).

## Bootstrap backend application first and enable HTTPS locally
Follow **"Run this project locally"** section of `product-catalog-backend` (https://github.com/hoangcao21/product-catalog-backend) repository first to bootstrap backend application, then copy `localhost.pem` and `localhost-key.pem` from backend repo to this current directory to be ready to enable HTTPS locally.

## Install required dependencies
Simply execute `yarn` to install all dependencies.

## Setting up Environment Variables
You need to define values for environment variables.
```
VITE_BACKEND_URL=<URL that points to backend application. For example, in this format: https://host.docker.internal:8443>
VITE_DEFAULT_PORT=5443 // This is the port of Vite web server that serves ReactJS resources. Leave it "5433" as-is.
```

## Run docker
Requires that Docker Desktop is up and running.

Simply execute `docker-compose -f ./docker-compose.yml -p 'product-catalog-frontend' up -d`.

Your frontend application should be up and running.

# Deploy this project to AWS
To be able to deploy this project to AWS, you are required to do these steps:
- Navigate to `product-catalog-iac` repository, run this command `cdk synth && cdk deploy ProductCatalogBackendStack` first to deploy backend resources to AWS
- After the successful deployment of backend stack, console will output the public URL of API Gateway, you will need to copy the value of `ProductCatalogBackendStack.CfnRestApiGatewayUrl`, then navigate back to this repository to paste the value to environment variable
```
// product-catalog-iac
Outputs:
ProductCatalogBackendStack.CfnRestApiGatewayUrl = <generated value> // Copy this value
ProductCatalogBackendStack.RestApiGatewayEndpointF48811B0 = <generated value>

// product-catalog-frontend
VITE_BACKEND_URL=https://nz8uq2o4r0.execute-api.ap-southeast-1.amazonaws.com/prod/ // Paste the value here
VITE_DEFAULT_PORT=80 // Default port should be "80" because S3 bucket is behind the CloudFront
```
- Remove your `dist` folder
- Run the script `yarn build` to let Vite build and bundle your codes
- Navigate to `product-catalog-iac`, run this command `cdk synth && cdk deploy ProductCatalogFrontendStack` to deploy frontend resources to AWS
- After the successful deployment of frontend stack, console will output the public CloudFront URL that points to your S3 bucket, and the URL is the one you need to access your frontend website.
```
// product-catalog-iac
Outputs:
ProductCatalogFrontendStack.CfnFrontendBucketName = <generated value>
ProductCatalogFrontendStack.CfnFrontendBucketWebsiteUrl = <generated value>
ProductCatalogFrontendStack.CfnFrontendCloudFrontDistributionName = <generated value> // This is the URL that let you get access to your frontend application