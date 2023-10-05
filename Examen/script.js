class Paciente {
    constructor(nombre, edad, genero, telefono, diagnostico) {
        this.nombre = nombre;
        this.edad = edad;
        this.genero = genero;
        this.telefono = telefono;
        this.diagnostico = diagnostico;
    }
}

class RegistroPaciente {
    constructor() {
        this.pacientes = [];
    }

    agregarPaciente(paciente) {
        this.pacientes.push(paciente);
    }

    buscarPacienteRecursivamente(valor, campo, indice = 0, pacientesEncontrados = []) {
        if (indice >= this.pacientes.length) {
            return pacientesEncontrados;
        }

        const paciente = this.pacientes[indice];
        if (paciente[campo] === valor) {
            pacientesEncontrados.push(paciente);
        }

        return this.buscarPacienteRecursivamente(valor, campo, indice + 1, pacientesEncontrados);
    }

    buscarPacientePorNombre(nombre) {
        return this.buscarPacienteRecursivamente(nombre, "nombre");
    }

    buscarPacientePorDiagnostico(diagnostico) {
        return this.buscarPacienteRecursivamente(diagnostico, "diagnostico");
    }

    mostrarListaPacientes() {
        const listaPacientes = document.getElementById('lista');
        listaPacientes.innerHTML = '';

        this.pacientes.forEach(paciente => {
            const li = document.createElement('li');
            li.textContent = `${paciente.nombre}, ${paciente.edad} años, ${paciente.diagnostico}`;
            listaPacientes.appendChild(li);
        });
    }

    calcularEstadisticas() {
        const totalPacientes = this.pacientes.length;
        const sumaEdades = this.pacientes.reduce((suma, paciente) => suma + paciente.edad, 0);
        const edadPromedio = totalPacientes > 0 ? sumaEdades / totalPacientes : 0;

        document.getElementById('total-pacientes').textContent = totalPacientes;
        document.getElementById('edad-promedio').textContent = edadPromedio.toFixed(2);
    }

    eliminarPaciente(nombre) {
        this.pacientes = this.pacientes.filter(paciente => paciente.nombre !== nombre);
    }
}

const registro = new RegistroPaciente();

function agregarPaciente() {
    const nombre = document.getElementById('nombre').value;
    const edad = parseInt(document.getElementById('edad').value);
    const genero = document.getElementById('genero').value;
    const telefono = document.getElementById('telefono').value;
    const diagnostico = document.getElementById('diagnostico').value;

    const paciente = new Paciente(nombre, edad, genero, telefono, diagnostico);
    registro.agregarPaciente(paciente);

    document.getElementById('nombre').value = "";
    document.getElementById('edad').value = "";
    document.getElementById('genero').value = "";
    document.getElementById('telefono').value = "";
    document.getElementById('diagnostico').value = "";

    registro.mostrarListaPacientes();
    registro.calcularEstadisticas();
}

function mostrarPacientesEncontrados(pacientes) {
    const listaPacientesEncontrados = document.getElementById('lista-pacientes-encontrados');
    listaPacientesEncontrados.innerHTML = ''; 

    pacientes.forEach(paciente => {
        const li = document.createElement('li');
        li.textContent = `${paciente.nombre}, ${paciente.edad} años, ${paciente.diagnostico}`;

        const eliminarBtn = document.createElement('button');
        eliminarBtn.textContent = 'Eliminar';
        eliminarBtn.addEventListener('click', () => eliminarPaciente(paciente.nombre));

        li.appendChild(eliminarBtn);
        listaPacientesEncontrados.appendChild(li);
    });
}

function buscarPaciente(campo) {
    const valorABuscar = document.getElementById(`buscar-${campo}`).value;
    let pacientesEncontrados;

    if (valorABuscar !== "") {
        if (campo === 'nombre') {
            pacientesEncontrados = registro.buscarPacientePorNombre(valorABuscar);
        } else if (campo === 'diagnostico') {
            pacientesEncontrados = registro.buscarPacientePorDiagnostico(valorABuscar);
        }
        
        mostrarPacientesEncontrados(pacientesEncontrados);
    }
}

function eliminarPaciente(nombre) {
    registro.eliminarPaciente(nombre);
    registro.mostrarListaPacientes();
    registro.calcularEstadisticas();
    mostrarPacientesEncontrados([]);
}
