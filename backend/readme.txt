starting a ts node app

1.inilize a node app    ---- npm init -y 
2. install tyscript dependency    ----npm i -D typescript @types/node and ts-node
3. in the jsonfile use following data 
{
    "compilerOptions": {
        "module": "commonjs",
        "esModuleInterop": true,
        "target": "ESNext",
        "moduleResolution": "node",
        "sourceMap": true,
        "outDir": "dist",
        "strict": true,
        "experimentalDecorators": true,
        "emitDecoratorMetadata": true,
        "lib": ["ESNext"]
    }
}

4. now in index.js listen to the port 
    const app = express();
    app.listen(PORT, () => {
        return console.log(`express is running on port ${PORT}`)
    })

    5. i package.json add thi scrypt  -----"start": "npx nodemon ./src/index.ts"


    the node app is running properly then perform other action
    