const { query } = require('express');

const express = require('express'),
    app = express(),
    path = require("path"),
    qs = require('qs'),
    rutas = require('express').Router();
    port = (process.env.port || 3001),

app.use(express.json());

// Asignación del puerto

app.set('port', process.env.port || 3001);

app.use('/api', rutas);

app.listen(app.get('port'),(error)=>{
    if(error){
        console.log('Error al iniciar servidor: '+error)
    } else{
        console.log('Servidor iniciado en el puerto: '+port)
    }
})

app.use(express.urlencoded({ extended: true })); 

// Módulo de encriptación
const crypto = require("crypto");

function encrypt( msg ){
    const algorithm = "aes-256-cbc"; 
    const cipher = crypto.createCipheriv(algorithm, Buffer.from("12345678901234567890123456789012", "utf-8"), Buffer.from("1234567890123456", "utf-8"));
    let encryptedData = cipher.update(msg, "utf-8", "hex");
    encryptedData += cipher.final("hex");

    return encryptedData;
}

// Módulo de base de datos

var mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database : 'carpin'
}); 

con.connect(function(error){
    if(error){
       throw error;
    }else{
       console.log('Conexion correcta.');
       var query = 'SELECT * FROM usuario';
        con.query(query, function(err, rows, fields) {
            if (err) throw err;
            else{
                for( const row of rows ){
                    console.log(row.nombre)
                }
            } 
        }); 
    }
}); 

// Módulo de Roles

rutas.get('/getAllRoles', function(req, res){
    let sql = 'SELECT * FROM rol'
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Roles encontrados', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'No se encontraron roles'}))
            }         }
     })
})

// Módulo de Usuario

rutas.get('/getAll', function(req, res){
    let sql = 'SELECT u.idUsuario, u.nombre, u.apellidos, u.correo, u.celular, u.password, r.nombre AS nombreRol FROM `usuario` u LEFT JOIN rol r ON u.rol = r.idRol WHERE u.estatus = 1 ORDER BY u.nombre'
     con.query(sql,(err, rows, fields)=>{
        if(rows.length>0){
            res.end(JSON.stringify({status:200,message:'Usuarios encontrados', data:rows}))
        } else{
            res.end(JSON.stringify({status:403,message:'No se encontraron usuarios'}))
        }
     })
})

rutas.get('/getContratistas', function(req, res){
    let sql = 'SELECT u.idUsuario, u.nombre, u.apellidos, u.correo, u.celular, u.password, r.nombre AS nombreRol FROM `usuario` u LEFT JOIN rol r ON u.rol = r.idRol WHERE u.estatus = 1 AND r.tipo = 2'
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Contratistas encontrados', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'No se encontraron contratistas'}))
            }
         }
     })
})

rutas.get('/getAllUsersByRol/:rol',(req, res)=>{
    const {rol} = req.params;
    let sql = 'SELECT * FROM usuario where rol = ?'
    con.query(sql, [rol],(err, rows, fields)=>{
        if(err) throw err;
        else{
            res.json(rows);
        }
    })
})

rutas.get('/getUserById/:id',(req, res)=>{
    const {id} = req.params;
    let sql = 'SELECT u.idUsuario, u.nombre, u.apellidos, u.correo, u.celular, u.password, r.nombre AS nombreRol FROM `usuario` u LEFT JOIN rol r ON u.rol = r.idRol where idUsuario = ?'
    con.query(sql, [id],(err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'User found', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:403,message:'User not found'}))
            }
        }
    })

})

rutas.get('/getUserByEmail/:email',(req, res)=>{
    const {email} = req.params;
    let sql = 'SELECT * FROM usuario where correo = ?'
    con.query(sql, [email],(err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'User found', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:403,message:'User not found'}))
            }
        }
    })
})

rutas.post('/changePassword',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{id, password} = req.body;
    let sql = `UPDATE usuario set password = '${encrypt(password)}' where idUsuario = '${id}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Password Updated', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }    
        }
    })
})

rutas.post('/addUser',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{nombre, apellidos, correo, celular, password, idRol} = req.body;
    let sql = `INSERT into usuario(nombre, apellidos, correo, celular, password, rol) values('${nombre}','${apellidos}','${correo}','${celular}','${password}', '${idRol}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'User Created', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }    
        }
    })
})

rutas.post('/editUser',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idUsuario, nombre, apellidos, correo, celular, password} = req.body;
    let sql = `UPDATE usuario set nombre = '${nombre}', apellidos = '${apellidos}', correo = '${correo}', celular = '${celular}', password = '${encrypt(password)}'  where idUsuario = '${idUsuario}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'User Updated', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }     
        }
    })
})

rutas.post('/deleteUser',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idUsuario} = req.body;
    let sql = `UPDATE usuario set estatus = '0' where idUsuario = '${idUsuario}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'User Deleted', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }
        }
    })
})

// Inicio de sesión

rutas.post('/login',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{correo, password} = req.body;
    let sql = `SELECT * FROM usuario where correo = '${correo}' AND password = '${encrypt(password)}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Login', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:403,message:'Invalid login'}))
            }  
        }
    })
})

// Módulo de Especialidades

rutas.post('/addEspecialidad',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{nombre, descripcion} = req.body;
    let sql = `INSERT into especialidad(nombre, descripcion) values('${nombre}','${descripcion}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Specialty Created', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }
        }
    })
})

rutas.get('/getEspecialidades', function(req, res){
    let sql = 'SELECT * FROM especialidad'
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Ok', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'Something went wrong'}))
            }
         }
     })
})

rutas.post('/editEspecialidad',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idEspecialidad, nombre, descripcion} = req.body;
    let sql = `UPDATE especialidad set nombre = '${nombre}', descripcion = '${descripcion}' where idEspecialidad = '${idEspecialidad}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Specialty Updated', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }   
        }
    })
})

// Módulo de ubicaciones

rutas.post('/addUbicacion',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{nombre, estado, ciudad, direccion} = req.body;
    let sql = `INSERT into ubicacion(nombre, estado, ciudad, direccion) values('${nombre}','${estado}','${ciudad}','${direccion}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Ubication Created', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.get('/getUbicaciones', function(req, res){
    let sql = 'SELECT * FROM ubicacion'
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Ok', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'Something went wrong'}))
            }
         }
     })
})

rutas.post('/editUbicacion',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idUbicacion, nombre, estado, ciudad, direccion} = req.body;
    let sql = `UPDATE ubicacion set nombre = '${nombre}', estado = '${estado}', ciudad = '${ciudad}', direccion = '${direccion}' where idUbicacion = '${idUbicacion}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Specialty Updated', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }   
        }
    })
})

// Módulo de obras

rutas.get('/getObras', function(req, res){
    let sql = 'SELECT * FROM obra WHERE estatus = 1'
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Ok', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'Something went wrong'}))
            }
         }
     })
})

rutas.post('/getObrasFilts',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{inicioA, inicioB, finA, finB, local} = req.body;
    let sql = `SELECT * FROM obra WHERE estatus = 1`
    if(inicioA) sql += ` AND (inicio BETWEEN '${inicioA}' AND '${inicioB}')`
    if(finA) sql += ` AND (fin BETWEEN '${finA}' AND '${finB}')`
    if(local) sql += ` AND local = ${local}`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Obras encontradas', data:rows}))
                console.log(sql)
            } else{
                res.end(JSON.stringify({status:500,message:'No se encontraron obras', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/addObra',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{numero, titulo, descripcion, inicio, fin, ubicacionObra, prototipo, numeroContrato, importes, reglas} = req.body;
    let sql = `INSERT into obra(numero, titulo, descripcion, inicio, fin, ubicacionObra, prototipo, numeroContrato, importes, reglas) values('${numero}','${titulo}','${descripcion}','${inicio}','${fin}','${ubicacionObra}','${prototipo}','${numeroContrato}','${importes}','${reglas}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Project Created', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/editObra',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idObra, numero, titulo, descripcion, inicio, fin, ubicacionObra, prototipo, numeroContrato, importes, reglas} = req.body;
    let sql = `UPDATE obra set numero = '${numero}', titulo = '${titulo}', descripcion = '${descripcion}', inicio = '${inicio}', fin = '${fin}', ubicacionObra = '${ubicacionObra}', prototipo = '${prototipo}', numeroContrato = '${numeroContrato}', importes = '${importes}', reglas = '${reglas}' where idObra = '${idObra}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Project Updated', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Something went wrong', data:rows}))
            }   
        }
    })
})

// Módulo Bitácoras

rutas.get('/getBitacoras', function(req, res){
    let sql = "SELECT b.idBitacora, b.idObra, b.idContratista, b.idEspecialidad, b.idSupervisor, b.Folio as folio, o.numero as nObra, o.titulo as tObra, CONCAT(uc.nombre, ' ', uc.apellidos) as contratista, e.nombre as especialidad, CONCAT(us.nombre, ' ', us.apellidos) as supervisor, o.ubicacionObra as uObra FROM bitacora b LEFT JOIN obra o ON o.idObra = b.idObra LEFT JOIN usuario uc ON uc.idUsuario = b.idContratista LEFT JOIN especialidad e ON e.idEspecialidad = b.idEspecialidad LEFT JOIN usuario us ON us.idUsuario = b.idSupervisor WHERE b.estatus = 1"
     con.query(sql,(err, rows, fields)=>{
         if(err) throw err;
         else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Ok', data:rows}))
            } else{
                res.end(JSON.stringify({status:403,message:'Something went wrong'}))
            }
         }
     })
})

rutas.post('/addBitacora',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idObra, idContratista, idEspecialidad, idSupervisor} = req.body;
    let sql = `INSERT into bitacora(Folio, idObra, idContratista, idEspecialidad, idSupervisor) values('${idObra}${idContratista}${idEspecialidad}','${idObra}','${idContratista}','${idEspecialidad}','${idSupervisor}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Bitácora Creada', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/addInvolucrado',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idBitacora, idUsuario, notificaciones, firma} = req.body;
    let sql = `INSERT into involucrados_bitacora(idBitacora, idUsuario, notificaciones, firma) values('${idBitacora}','${idUsuario}','${notificaciones}','${firma}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Involucrado Creado', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/getEspFromObraContratista',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idObra, idContratista} = req.body;
    let sql = `SELECT e.nombre FROM bitacora b LEFT JOIN especialidad e ON e.idEspecialidad=b.idEspecialidad WHERE b.idObra='${idObra}' AND b.idContratista='${idContratista}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Especialidades Encontradas', data:rows}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/getInvolucradosBitEsp',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idBitacora} = req.body;
    let sql = `SELECT ib.idUsuario, CONCAT(u.nombre, ' ', u.apellidos) as usuario, u.correo, ib.notificaciones, ib.firma FROM involucrados_bitacora ib LEFT JOIN usuario u ON ib.idUsuario = u.idUsuario WHERE ib.idBitacora='${idBitacora}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Involucrados Encontrados', data:rows}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/addNota',(req, res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idBitacora, tipo, idAutor, mensaje} = req.body;
    let sql = `INSERT into nota(idBitacora, tipo, idAutor, mensaje) values('${idBitacora}','${tipo}','${idAutor}','${mensaje}')`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.affectedRows>0){
                res.end(JSON.stringify({status:200,message:'Nota Creada', data:rows[0]}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/getNotas',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idBitacora} = req.body;
    let sql = `SELECT n.tipo, CONCAT(u.nombre, ' ', u.apellidos) as usuario, n.fecha, n.mensaje, n.idNota FROM nota n LEFT JOIN bitacora b ON n.idBitacora = b.idBitacora LEFT JOIN usuario u ON n.idAutor = u.idUsuario WHERE n.tipo = 1 AND b.idBitacora='${idBitacora}'`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Notas Encontradas', data:rows}))
            } else{
                res.end(JSON.stringify({status:500,message:'Algo salió mal', data:rows}))
                console.log(sql)
            }
        }
    })
})

rutas.post('/getRespuestas',(req,res)=>{
    res.setHeader('Content-Type', 'application/json');
    const{idBitacora} = req.body;
    let sql = `SELECT n.tipo, CONCAT(u.nombre, ' ', u.apellidos) as usuario, n.fecha, n.mensaje FROM nota n LEFT JOIN bitacora b ON n.idBitacora = b.idBitacora LEFT JOIN usuario u ON n.idAutor = u.idUsuario WHERE n.tipo = 2 AND b.idBitacora='${idBitacora}' ORDER BY n.fecha DESC`
    con.query(sql, (err, rows, fields)=>{
        if(err) throw err;
        else{
            if(rows.length>0){
                res.end(JSON.stringify({status:200,message:'Respuestas Encontradas', data:rows}))
            } else{
                res.end(JSON.stringify({status:500,message:'No se encontraron respuestas', data:rows}))
                console.log(sql)
            }
        }
    })
})