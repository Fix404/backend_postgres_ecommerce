import app from "./app";

const PORT = process.env.PORT;

app.listen(PORT, () =>{
    console.log(`Se está escuchando el puerto: ${PORT}`)
})