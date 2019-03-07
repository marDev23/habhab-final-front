const express = require('express')

const app = express()
const PORT = process.env.PORT || 80

app.use(express.static('build'))

app.get('*', (req, res) => {
	res.sendFile(`${__dirname}/build/index.html`)
})

app.listen(PORT, () => {
	console.log('App running on' +' '+PORT)
})