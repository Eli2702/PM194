const personas = [
  { nombre: "Ana", edad: 22 },
  { nombre: "Luis", edad: 35 },
  { nombre: "María", edad: 28 }
];

//.find() buscar persona con nombre Luis
const personaLuis = personas.find(persona => persona.nombre === "Luis");
console.log("Persona encontrada:", personaLuis);

//.forEach() imprimir nombre y edad de cada persona
personas.forEach(persona => {
 console.log(persona.nombre + " tiene " + persona.edad + " años");

});

//.reduce() sumar todas las edades
const totalEdades = personas.reduce((acumulador, persona) => acumulador + persona.edad, 0);
console.log("Suma total de edades:", totalEdades);
