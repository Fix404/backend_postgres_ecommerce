import appEcommerce from "./app";

const PORT = process.env.PORT;

appEcommerce.listen(
    console.log(`Se está escuchando el puerto: ${PORT}`)
)