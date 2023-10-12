<!-- include all the steps needed to install and start the project -->

# Installation

1. Make sure you have [pnpm](https://pnpm.io/installation) installed
2. Make sure you have node version 18.17.1 installed
3. Clone the Github repository
4. Install dependencies:

```sh
pnpm install
```

5. Create a `.env` file in the root of the project and add the following environment variables:

```sh
DATABASE_URL=postgres://postgres:postgres@localhost:5432/show_commits // replace with your database url for prisma
```

6. Run the migrations:

```sh
pnpm run migrate
```

or use db push (I think that for this example this is the best option)
  
```sh
pnpm run db:push
```

7. Start the server:

```sh
pnpm start
```

# Usage

1. The API is now running on `http://localhost:3000`

2. The API documentation is available at `http://localhost:3000/api`

# Tips

- You can use tools like `fnm`or `nvm` to manage your node versions, here I provided a `nvmrc` file with the node version used in this project.
- You can run `pnpm run dev` to start the server in development mode. This will automatically restart the server when you make changes to the code.
- You can run `pnpm run lint` to lint the code.
- You can run `pnpm run test` to run the tests.
- You can run `pnpm run test:e2e` to run the e2e tests.
- You can run `pnpm run build` to build the project.
