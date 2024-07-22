### 3. Start express webserver

Run

```
npm run dev
```

 

Run

```
npm start
```

to start the webserver on port `8080` without hot reload functionality.

# Useful commands:
 

```
"start": "ts-node src/index.ts",
"dev": "tsnd --respawn src/index.ts",
"init": "npx typeorm init --name typeorm-tutorial --database postgres --docker",
"migrate": "ts-node ./node_modules/typeorm/cli.js migration:run",
"revert": "ts-node ./node_modules/typeorm/cli.js migration:revert",
"generate": "ts-node ./node_modules/typeorm/cli.js migration:generate -n migration -p",
"generate-dry": "ts-node ./node_modules/typeorm/cli.js migration:generate -n migration -p --dr",
"make-migration": "npx typeorm migration:create -n migrationName"
```
