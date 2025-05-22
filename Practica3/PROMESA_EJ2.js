// Ejercicio promesa
function verificarUsuario(usuario) {
  return new Promise((resolve, reject) => {
    if (usuario === "admin") {
      resolve("Acceso concedido");
    } else {
      reject("Acceso denegado");
    }
  });
}

// Prueba con "admin"
verificarUsuario("Alma")
  .then(res => console.log(res))    // Acceso concedido
  .catch(err => console.error(err));

// Prueba con otro usuario
verificarUsuario("Ivan")
  .then(res => console.log(res))
  .catch(err => console.error(err)); // Acceso denegado
