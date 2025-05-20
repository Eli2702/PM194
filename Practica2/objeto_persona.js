const persona ={
    nombre: "Ivan Isay",
    edad: 37,
    direccion: {
        ciudad: "Qro",
        pais: "Mx"
    }
}

// Desestructuración del objeto persona
const { nombre, edad, direccion: { ciudad } } = persona;

console.log("Me llamo " + nombre + ", tengo " + edad + " años y vivo en " + ciudad + ".");

