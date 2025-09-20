const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const cors = require('cors'); // <--- 1. LÍNEA NUEVA

const adapter = new FileSync('db.json');
const db = low(adapter);

db.defaults({ registros: [] }).write();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // <--- 2. LÍNEA NUEVA
app.use(express.json());
app.use(express.static('.'));

app.post('/guardar-registro', (req, res) => {
    const nuevoRegistro = {
        nombre: req.body.nombre,
        cumpleanos: req.body.cumpleanos,
        fechaDeRegistro: new Date().toISOString()
    };

    db.get('registros').push(nuevoRegistro).write();
    console.log('Nuevo registro guardado:', nuevoRegistro);
    res.json({ success: true, message: '¡Registro guardado con éxito!' });
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});