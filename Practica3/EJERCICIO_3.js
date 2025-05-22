function simularPeticionAPI() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("Datos recibidos correctamente");
    }, 5000); 
  });
}

// Función async
async function obtenerDatos() {
  const resultado = await simularPeticionAPI();
  console.log(resultado); 
}

obtenerDatos();
