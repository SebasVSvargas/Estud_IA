require('dotenv').config();
const app = require('./app');

const PORT = process.env.PORT || 3000;

app.initDB.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on http://127.0.0.1:${PORT}`);
    });
}).catch(err => {
    console.error("Error al inicializar la base de datos", err);
    process.exit(1);  // Detener el servidor si la BD falla
});