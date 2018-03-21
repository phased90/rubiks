let express = require('express')

const PORT = 3000

let app = express()

app.use(express.static('./'))

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`)
})