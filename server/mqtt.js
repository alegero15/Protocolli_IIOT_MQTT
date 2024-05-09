const express = require('express')
const sqlite3 = require('sqlite3').verbose()
const path  = require('path')
const router = express.Router()

const db = new sqlite3.Database(
    path.join(
        'db',
        'database.db'
    )
)


const mqtt = require('mqtt')
const client = mqtt.connect('mqtt://test.mosquitto.org')


client.on('connect', function () {
    console.log("Connesso");
    client.subscribe('iot2024/tony');
})

const int = 0;
client.on('message', function (topic, message){
    console.log(message.toString());
    const string = message.toString();
    const int = parseInt(string)
    console.log(int);

    db.serialize(() => {
        db.run('INSERT INTO MqttTest (speed) VALUES ($speed)',
        {
            $speed:int,
        },
        (err) => {
            if (err) {
                console.log('err', err)
            } else {
                console.log('Inserimento nel database completato con successo.');
            }
        })
    })
    
})


// db.serialize(() =>{
//     db.all('SELECT ROWID, * FROM MqttTest', (err, rows) => {
//         if (err){
//             console.error(err)
//             console.log('Errore nel get')
        
//         } else {
            
//             console.log('GET CORRETTO DI SPEED')
//             console.log(rows)
//         }
//     })
// })





