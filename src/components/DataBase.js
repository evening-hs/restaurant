require('dotenv').config();

const MongoClient = require('mongodb').MongoClient;

async function main() {
    const uri = process.env.MONGODB_URI;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true })

    try {
        // Returns a promise
        // Must use await to block further execution until complete
        await client.connect();

        // For testing purpouse. REMOVE ME
        await listdbs(client)

        await client.close();
    } catch (error) {
        console.log("Cannot connect to database:\n", error)
    } finally {
        // Close the connection
        await client.close();
    }
    
}

/**
 * This is used only to test if it works
 * REMOVE ME in production
 * 
 * Prints all the databases in the cluster to the console
 * Expected output:
 * Databases: 
 * - restaurant-tests
 * - admin
 * - local
 * 
 * @param {*} client 
 */
async function listdbs(client) {
    dbsList = await client.db().admin().listDatabases();

    console.log("Databases: ");
    dbsList.databases.forEach(db => console.log(` - ${db.name}`))
}

main().catch(console.error);