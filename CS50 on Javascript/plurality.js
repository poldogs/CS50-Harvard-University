// Definición del número máximo de candidatos
const MAX = 9;

// Definición de la estructura de candidato
function Candidate(name) {
    this.name = name;
    this.votes = 0;
}

// Array de candidatos
const candidates = [];

// Función para registrar un voto
function vote(name) {
    for (let i = 0; i < candidate_count; i++) {
        if (name === candidates[i].name) {
            candidates[i].votes++;
            return true; // Voto válido
        }
    }
    return false; // Voto inválido
}

// Función para imprimir al ganador o ganadores
function print_winner() {
    let max_votes = 0;
    
    // Encuentra el número máximo de votos
    for (let i = 0; i < candidate_count; i++) {
        if (candidates[i].votes > max_votes) {
            max_votes = candidates[i].votes;
        }
    }
    
    // Imprime a todos los candidatos con el número máximo de votos
    for (let i = 0; i < candidate_count; i++) {
        if (candidates[i].votes === max_votes) {
            console.log(candidates[i].name);
        }
    }
}

// Solicitar el número de candidatos
let candidate_count = parseInt(prompt("Número de candidatos:"));

if (isNaN(candidate_count) || candidate_count < 1 || candidate_count > MAX) {
    console.log(`El número de candidatos debe estar entre 1 y ${MAX}.`);
} else {
    // Registrar a los candidatos
    for (let i = 0; i < candidate_count; i++) {
        let name = prompt(`Nombre del candidato ${i + 1}:`);
        candidates.push(new Candidate(name));
    }
    
    // Solicitar el número de votantes
    let voter_count = parseInt(prompt("Número de votantes:"));
    
    if (isNaN(voter_count) || voter_count < 1) {
        console.log("El número de votantes debe ser un número positivo.");
    } else {
        // Realizar la votación
        for (let i = 0; i < voter_count; i++) {
            let name = prompt(`Voto del votante ${i + 1}:`);
            
            if (!vote(name)) {
                console.log("Voto inválido.");
            }
        }
        
        // Mostrar al ganador o ganadores
        print_winner();
    }
}
