import cors from "cors"
import express, { response } from "express"

import { download } from "./download.js"
import { transcribe } from "./utils/transcribe.js"
import { summarize } from "./utils/summarize.js"

const app = express()
app.use(cors())
app.use(express.json())

app.get("/summary/:id", async (request, response) => {
  await download(request.params.id)

  const result = await transcribe()

  return response.json({ result })
})

app.post("/summary", async (request, response) => {
  const result = summarize(request.body.text)
  return response.json({ result })
})

app.listen(3333, () => console.log("Server is running on port 3333"))
