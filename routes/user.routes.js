module.exports = (app, connection) => {
    app.route("/users")

        // Método GET para iniciar sesión.
        .get((req, res) => {
            try {
                let { email, password } = req.query;
                connection.query("SELECT * FROM USUARIO WHERE correo = ? AND contrasena = ?", [
                    email,
                    password
                ], (err, results, fields) => {
                    if (err) {
                        console.log({"getUserConnectionErr": err});
                        res.json({
                            "code": 500,
                            "message": "Ocurrió un error mientras se intentaron seleccionar los valores de la base de datos.",
                            "data": false
                        });
                        return;
                    }

                    console.log({"getUserConnectionResults": results});
                    console.log({"getUserConnectionResultsLength": results.length});

                    if (results.length) {
                        res.json({
                            "code": 200,
                            "message": "¡Los datos han sido obtenidos con éxito!",
                            "data": true
                        })
                    } else {
                        res.json({
                            "code": 201,
                            "message": "No se han encontrado datos con el correo y contraseña otorgados.",
                            "data": false
                        });
                    }
                })
            } catch (e) {
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error en el servidor mientras se intentaba validar el inicio de sesión.",
                    "data": false
                });
            }
        })

        // Método POST para la creación o el registro de usuarios.
        .post((req, res) => {
            try {
                let { name, email, password } = req.body;
    
                if (!name) {
                    res.json({
                        "code": "301",
                        "message": "Error. El nombre es un campo obligatorio.",
                        "data": false
                    });
                    return;
                }
    
                if (!email) {
                    res.json({
                        "code": "301",
                        "message": "Error. El correo es un campo obligatorio.",
                        "data": false
                    });
                    return;
                }
    
                if (!password) {
                    res.json({
                        "code": "301",
                        "message": "Error. La contraseña es un campo obligatorio.",
                        "data": false
                    });
                    return;
                }

                connection.query("INSERT INTO USUARIO(correo, contrasena, nombre) VALUES(?,?,?)", [email, password, name], (err, results, fields) => {
                    if (err) {
                        console.log({"postConnectionErr": err});
                        res.json({
                            "code": 500,
                            "message": "Ocurrió un error al intentar realizar la inserción en la base de datos.",
                            "data": false
                        })
                        return;
                    }

                    res.json({
                        "code": 200,
                        "message": "User created successfuly.",
                        "data": true
                    })
                })
            } catch (e) {
                res.json({
                    "code": 500,
                    "message": "Ocurrió un error en el servidor al intentar crear el usuario.",
                    "data": false
                })
            }
        })

    .put((req, res) => {
        try {
            let { originalEmail, newEmail, newPassword } = req.body;
    
            console.log({originalEmail});
            console.log({newEmail});
            console.log({newPassword});
    
            if (!originalEmail) {
                res.json({
                    "code": 301,
                    "message": "El correo original es un campo obligatorio.",
                    "data": false
                })
                return;
            }
    
            connection.query('UPDATE USUARIO SET correo = ?, contrasena = ? WHERE correo = ?', 
                [newEmail, newPassword, originalEmail], (err, results, fields) => {
                    if (err) {
                        console.log({"putConnectionErr": err});
                        res.json({
                            "code": 500,
                            "message": "Ocurrió un error al intentar realizar la actualización en la base de datos.",
                            "data": false
                        })
                        return;   
                    }
    
                res.json({
                    "code": 200,
                    "message": "User updated successfuly.",
                    "data": true
                })
            })
        } catch (e) {
            console.log("putError: " + e);
            res.json({
                "code": 500,
                "message": "There was an error while trying to update the user.",
                "data": false
            })
        }
    })
}