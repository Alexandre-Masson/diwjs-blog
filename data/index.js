import { MongoClient, ServerApiVersion } from "mongodb";


const uri = process.env.MONGO_URL || '';

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri,  {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    }
)
    .connect(uri, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log("Connection failed for some reason");
    }
        console.log("Connection established - All well");
        return client;
});

export default client;