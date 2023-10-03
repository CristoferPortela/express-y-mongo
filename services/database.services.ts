import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";


export const collections: { cobros?: mongoDB.Collection } = {}


export async function connectToDatabase () {
    dotenv.config();

    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);

    await client.connect();

    const db: mongoDB.Db = client.db(process.env.DB_NAME);

    const cobrosCollection: mongoDB.Collection = db.collection(process.env.DB_NAME as string);

    collections.cobros = cobrosCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${cobrosCollection.collectionName}`);
}