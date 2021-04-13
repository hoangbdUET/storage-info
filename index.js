const express = require('express');
const app = express();
const { exec } = require('child_process');
const { stderr, stdout } = require('process');

app.get('/', (req, res) => {
    res.send("Hello")
})

app.get('/health', (req, res) => {
    exec('df -h', (err, stdout, stderr) => {
        console.log(err, stderr)
        let data_table = stdout.split('\n')
        data_table = data_table.map(line => {
            return line.replace(/  +/g, ' ').split(' ')
        })
        let i2g_data = data_table.find(r => r[5] === "/elasticsearch_data_disk");
        res.send({
            "Filesystem": i2g_data[0],
            "Size": i2g_data[1],
	    "Used": i2g_data[2],
            "Avail": i2g_data[3],
            "Use%": i2g_data[4],
            "Mounted": i2g_data[5],
        })
    })
})

app.listen(3000, (err) => {
    console.log("App listening on port 3000", err)
})
