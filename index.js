const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express')
const cors = require("cors")
const app = express()
const port = 5000

// middleware 
app.use(cors())
app.use(express.json())
require("dotenv").config()





async function run() {
  try {
   
    const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASS}@cluster0.hcgdznz.mongodb.net/?retryWrites=true&w=majority`
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });

   const projectsCollection = client.db("myWebsiteDatabase").collection("projects")
   
   app.get("/limitProjects", async(req, res ) => {
      const filter = {}
      const result = await projectsCollection.find(filter).limit(3).toArray()
      res.send(result)
   })
   
   app.get("/allProjects", async (req, res ) => {
    const filter = {}
    const result = await projectsCollection.find(filter).toArray()
    res.send(result)
   })


   app.post('/makeProject', async (req, res ) => {
       const makeProject = req.body
       console.log(makeProject)
       const result = await projectsCollection.insertOne(makeProject)
       res.send(result)
   })





  } finally {
  
   
  }
}



run().catch(console.dir);










app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Parsonal Website Server listening on port ${port}`)
})
