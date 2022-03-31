const { query } = require('express');
const { send } = require('express/lib/response');


const express = require('express'),
    request = require('request'),
    nodemailer = require("nodemailer"),
    app = express(),
    path = require("path"),
    qs = require('qs');

    
var mysql = require('mysql');

 var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'emed' 
    /* host: "198.199.98.233",
    port: "3306",
    user: "mysql",
    password: "$3Hec@TL%",
    database: "emed" */
  }); 

 con.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta.');
    }
 }); 

/* var query = 'SELECT * FROM pago';

 con.query(query, function(err, rows, fields) {
    if (err) throw err;
    console.log(rows[0].numero_tarjeta);
  });  */

   /*
  const pathICS = `${__dirname}/event.ics`
  ics.createEvent({
    title: 'Cumpleañosss',
    description: 'Cumplió añosss',
    start: [2022, 6, 7, 12, 30],
    organizer: { name: 'Miriam Benavides', email: 'miriam@benavides.com' },
    duration: { minutes: 30 }
  }, (error, value) => {
    if (error) {
      console.log(error)
    }
  
    writeFileSync(pathICS, value)
  })

 try {
    unlinkSync(pathICS)
    //file removed
  } catch(err) {
    console.error(err)
  }*/
