// CONSTANTES Y VARIABLES GLOBALES 

const CONTENEDOR_PRODUCTOS = "contenedorCarrito";
const RESUMEN_COSTOS = "resumenCostos";
const ENVIO_Y_PAGO = "envioYPago";

// Porcentajes de costos de envío
const COSTOS_ENVIO = {
    premium: 0.15, // 15%
    express: 0.07, // 7%
    standard: 0.05 // 5%
};
let costoEnvioActual = COSTOS_ENVIO.standard; 
let metodoPagoSeleccionado = null; // Variable global para rastrear el método de pago válido

// TASA DE CONVERSIÓN: Añadida para manejar UYU
const TASA_CONVERSION_UYU_USD = 40;

// FUNCIONES AUXILIARES 

/* Función para actualizar el subtotal de un producto específico en tiempo real.*/

function actualizarSubtotal(index, carrito) {
    const inputElement = document.querySelector(`.cantidad-input[data-index="${index}"]`);
    const subtotalElement = document.getElementById(`subtotal-${index}`);

    const nuevaCantidad = parseInt(inputElement.value) || 1;
    const costoUnitario = carrito[index].costo;
    
    // Validación de cantidad mínima (1)
    if (nuevaCantidad < 1) {
        inputElement.value = 1;
        carrito[index].cantidad = 1;
    } else {
        carrito[index].cantidad = nuevaCantidad;
    }

    // Calcular y actualizar el subtotal
    const nuevoSubtotal = costoUnitario * carrito[index].cantidad;
    subtotalElement.textContent = nuevoSubtotal.toFixed(2);

    // Guardar el carrito actualizado y recalcular totales
    localStorage.setItem("carrito", JSON.stringify(carrito));
    renderizarResumenCostos(carrito);
    
    // Actualizar el badge en la navegación
    if (typeof updateCartBadge === 'function') {
        updateCartBadge(); 
    }
}
function renderizarResumenCostos(carrito) {
    const contenedor = document.getElementById(RESUMEN_COSTOS);
    
    // 1. Inicializar acumuladores
    let subtotalesPorMoneda = {};
    let subtotalGeneralUSD = 0; // Acumulador para el total convertido a USD

    // 2. Iterar y calcular subtotales por moneda y subtotal general en USD
    carrito.forEach(producto => {
        const costoItem = producto.costo * producto.cantidad;
        const moneda = producto.moneda;
        
        // Acumular subtotal por moneda (para mostrar sumas individuales)
        if (!subtotalesPorMoneda[moneda]) {
            subtotalesPorMoneda[moneda] = 0;
        }
        subtotalesPorMoneda[moneda] += costoItem;

        // Convertir el costo del ítem a USD y acumular
        let costoItemUSD = costoItem;
        if (moneda === 'UYU') {
            costoItemUSD = costoItem / TASA_CONVERSION_UYU_USD;
        }
        subtotalGeneralUSD += costoItemUSD;
    });

    // 3. Generar el HTML para Subtotales Individuales
    let htmlSubtotales = '';
    
    for (const moneda in subtotalesPorMoneda) {
        const valorSubtotal = subtotalesPorMoneda[moneda].toFixed(2);
        
        // Muestra el subtotal para cada moneda (USD y/o UYU)
        htmlSubtotales += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Subtotal (${moneda})
                <span>${moneda} <span id="subtotal-general-${moneda.toLowerCase()}">${valorSubtotal}</span></span>
            </li>
        `;
    }
    
    // 4. Calcular costos finales (basados en subtotalGeneralUSD)
    const costoEnvioUSD = subtotalGeneralUSD * costoEnvioActual;
    const totalPagarUSD = subtotalGeneralUSD + costoEnvioUSD;
    
    // La moneda base para el envío y el total final es USD.
    const monedaBase = 'USD'; 

    // 5. Renderizar la sección de costos
    contenedor.innerHTML = `
        <h3>Tipo de envío</h3>
        <div class="card p-3 mb-4">
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoEnvio" id="premium" value="premium" required ${costoEnvioActual === COSTOS_ENVIO.premium ? 'checked' : ''}>
                <label class="form-check-label" for="premium">Premium (15%) - 2 a 5 días</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoEnvio" id="express" value="express" required ${costoEnvioActual === COSTOS_ENVIO.express ? 'checked' : ''}>
                <label class="form-check-label" for="express">Express (7%) - 5 a 8 días</label>
            </div>
            <div class="form-check">
                <input class="form-check-input" type="radio" name="tipoEnvio" id="standard" value="standard" required ${costoEnvioActual === COSTOS_ENVIO.standard ? 'checked' : ''}>
                <label class="form-check-label" for="standard">Standard (5%) - 12 a 15 días</label>
                <div class="invalid-feedback">Debes seleccionar un tipo de envío.</div>
            </div>
        </div>

        <h3>Costos</h3>
        <ul class="list-group list-group-flush">
            ${htmlSubtotales} 
            <li class="list-group-item d-flex justify-content-between align-items-center"> Subtotal General (en ${monedaBase})
                <span>${monedaBase} <span id="subtotal-general-convertido">${subtotalGeneralUSD.toFixed(2)}</span></span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center">
                Costo de Envío
                <span>${monedaBase} <span id="costo-envio">${costoEnvioUSD.toFixed(2)}</span></span>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-center bg-light fw-bold">
                TOTAL
                <span>${monedaBase} <span id="total-a-pagar">${totalPagarUSD.toFixed(2)}</span></span>
            </li>
        </ul>
    `;

    // Listener para cambiar el tipo de envío y actualizar costos
    document.querySelectorAll('input[name="tipoEnvio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            costoEnvioActual = COSTOS_ENVIO[e.target.value];
            renderizarResumenCostos(carrito);
        });
    });
}

// LÓGICA DE CHECKOUT Y VALIDACIÓN 

/* Función para gestionar la interacción dentro del modal de pago.*/

function handlePagoModal() {
    const radioTarjeta = document.getElementById('credito');
    const radioTransferencia = document.getElementById('transferencia');
    const camposTarjeta = document.getElementById('campos-tarjeta');
    const camposTransferencia = document.getElementById('campos-transferencia');
    const formaDePagoSpan = document.getElementById('forma-de-pago');
    
    // Función que se ejecuta al seleccionar un método
    function seleccionarMetodoPago(e) {
        // Desactivar y limpiar campos
        camposTarjeta.querySelectorAll('input').forEach(input => {
            input.disabled = true;
            input.required = false;
        });
        camposTransferencia.querySelectorAll('input').forEach(input => {
            input.disabled = true;
            input.required = false;
        });

        if (e.target.id === 'credito') {
            // Activar campos de Tarjeta de Crédito
            camposTarjeta.querySelectorAll('input').forEach(input => {
                input.disabled = false;
                input.required = true;
            });
            formaDePagoSpan.textContent = 'Tarjeta de Crédito';
        } else if (e.target.id === 'transferencia') {
            // Activar campos de Transferencia Bancaria
            camposTransferencia.querySelectorAll('input').forEach(input => {
                input.disabled = false;
                input.required = true;
            });
            formaDePagoSpan.textContent = 'Transferencia Bancaria';
        }
    }

    radioTarjeta.addEventListener('change', seleccionarMetodoPago);
    radioTransferencia.addEventListener('change', seleccionarMetodoPago);

    // Listener para el botón de Guardar (o cerrar) del modal
    document.getElementById('modalGuardarBtn').addEventListener('click', () => {
        // Validar que al menos un método esté seleccionado
        if (radioTarjeta.checked || radioTransferencia.checked) {
            
            // Validar los campos del método seleccionado
            const camposValidos = (radioTarjeta.checked && camposTarjeta.querySelector('input:invalid')) ||
                                  (radioTransferencia.checked && camposTransferencia.querySelector('input:invalid'));

            if (!camposValidos) {
                // Si la selección y campos son válidos
                metodoPagoSeleccionado = radioTarjeta.checked ? 'Tarjeta de Crédito' : 'Transferencia Bancaria';
                document.getElementById('forma-de-pago').classList.remove('text-danger');
                document.getElementById('pago-invalido-feedback').style.display = 'none';

                const modalElement = document.getElementById('formaPagoModal');
                const modal = bootstrap.Modal.getInstance(modalElement);
                modal.hide();

            } else {
                // Si la selección es válida pero los campos no están llenos
                alert('Por favor, completa todos los campos del método de pago seleccionado.');
            }
        } else {
             // Si no se ha seleccionado ningún método
             metodoPagoSeleccionado = null;
             document.getElementById('forma-de-pago').classList.add('text-danger');
             document.getElementById('pago-invalido-feedback').style.display = 'block';
        }
    });

    // Se establece el valor inicial al cargar la página si ya había una selección.
    if(radioTarjeta.checked) seleccionarMetodoPago({target: radioTarjeta});
    if(radioTransferencia.checked) seleccionarMetodoPago({target: radioTransferencia});
}

function validarFormulario(form, carrito) {
    form.classList.add('was-validated');
    
    // 1. Validar campos de envío (usando validación nativa del formulario)
    const camposEnvioValidos = form.checkValidity();

    // 2. Validar que se haya seleccionado un tipo de envío (ya incluido en el checkValidity si tiene required)
    
    // 3. Validar que se haya seleccionado y validado un método de pago
    const pagoValido = metodoPagoSeleccionado !== null;

    if (!pagoValido) {
        document.getElementById('forma-de-pago').classList.add('text-danger');
        document.getElementById('pago-invalido-feedback').style.display = 'block';
    } else {
        document.getElementById('forma-de-pago').classList.remove('text-danger');
        document.getElementById('pago-invalido-feedback').style.display = 'none';
    }

    if (camposEnvioValidos && pagoValido) {
        // Si todo es válido, simular la compra
        
        // Mostrar alerta de éxito
        document.getElementById('alert-success').style.display = 'block';

        // Opcional: limpiar el carrito y recargar
        localStorage.removeItem("carrito");
        
        // Deshabilitar botón para evitar envíos múltiples
        document.getElementById('btn-finalizar-compra').disabled = true;

        // Ocultar alerta después de 3 segundos y recargar
        setTimeout(() => {
            // location.reload(); 
            // Por ahora solo recargamos
            document.getElementById('alert-success').style.display = 'none';
        }, 3000);
        
        return true;
    }
    
    return false;
}

// FUNCIÓN PRINCIPAL 

document.addEventListener("DOMContentLoaded", () => {
    // Inicialización de datos
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contenedor = document.getElementById(CONTENEDOR_PRODUCTOS);
    const formContainer = document.getElementById(ENVIO_Y_PAGO);

    // Renderizar productos y costos
    if (carrito.length === 0) {
        contenedor.innerHTML = `
        <img src ="img/carrito.png" alt="Carrito de compras" style="width:50px; height:50px;"> 
            <p class="text-muted">Tu carrito está vacío.</p>
            <p class="text-muted"> Descubrí <a href="categories.html" class="text-primary">nuevos productos</a>.</p>
        `;
        // No renderizar el formulario si el carrito está vacío
        formContainer.innerHTML = '';
        return; 
    }

    //  Renderizado de Tabla de Productos 

    const contenidoTabla = carrito.map((producto, index) => {
        const subtotalInicial = (producto.costo * producto.cantidad).toFixed(2);
        return `
            <tr data-index="${index}">
                <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 80px; height: auto;"></td>
                <td>${producto.nombre}</td>
                <td>${producto.moneda} ${producto.costo}</td>
                <td>
                    <input type="number" data-index="${index}" value="${producto.cantidad}" min="1" class="form-control cantidad-input w-75">
                </td>
                <td class="fw-bold">
                    ${producto.moneda} <span id="subtotal-${index}" class="subtotal-item">${subtotalInicial}</span>
                </td>
                <td>
                    <button class="btn btn-sm btn-danger eliminar-producto-btn" data-index="${index}" title="Eliminar">
                        <i class="fa fa-trash"></i>
                    </button>
                </td>
            </tr>
        `;
    }).join("");
    
    if (!contenedor) return
    contenedor.innerHTML = `
        <h3>Artículos a comprar</h3>
        <table class="table table-hover align-middle">
            <thead>
                <tr>
                    <th scope="col"></th> <th scope="col">Nombre</th>
                    <th scope="col">Costo</th>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col"></th> </tr>
            </thead>
            <tbody>
                ${contenidoTabla}
            </tbody>
        </table>
    `;

    // Renderizado de Costos y Formulario de Checkout 
    
    renderizarResumenCostos(carrito);

    formContainer.innerHTML = `
        <form id="checkout-form" class="needs-validation" novalidate>
            <h3>Dirección de envío</h3>
            <div class="card p-4 mb-4">
                <div class="mb-3">
                    <label for="calle" class="form-label">Calle</label>
                    <input type="text" class="form-control" id="calle" required>
                    <div class="invalid-feedback">Ingresa el nombre de la calle.</div>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label for="numero" class="form-label">Número</label>
                        <input type="text" class="form-control" id="numero" required>
                        <div class="invalid-feedback">Ingresa el número.</div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label for="esquina" class="form-label">Esquina</label>
                        <input type="text" class="form-control" id="esquina" required>
                        <div class="invalid-feedback">Ingresa la esquina.</div>
                    </div>
                </div>
            </div>

            <h3>Forma de pago</h3>
            <div class="card p-4 mb-4">
                <p>Método de pago seleccionado: 
                    <span id="forma-de-pago" class="fw-bold text-danger">No se ha seleccionado</span>
                </p>
                <button type="button" class="btn btn-link p-0 text-primary" data-bs-toggle="modal" data-bs-target="#formaPagoModal">
                    Seleccionar método de pago
                </button>
                <div id="pago-invalido-feedback" class="text-danger mt-2" style="display: none;">
                    Debes seleccionar una forma de pago válida.
                </div>
            </div>
            
            <div id="alert-success" class="alert alert-success mt-3" style="display:none;" role="alert">
                 ¡Has comprado con éxito!
            </div>
            
            <button class="btn btn-primary btn-lg mt-3" type="submit" id="btn-finalizar-compra">FINALIZAR COMPRA</button>
        </form>
    `;
    
    // Listener para actualizar cantidad
    document.querySelectorAll(".cantidad-input").forEach(input => {
        input.addEventListener("input", (e) => {
            const index = parseInt(e.target.dataset.index);
            actualizarSubtotal(index, carrito);
        });
    });

    // Listener para eliminar producto
    document.querySelectorAll(".eliminar-producto-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            const index = parseInt(e.currentTarget.dataset.index);
            carrito.splice(index, 1);
            localStorage.setItem("carrito", JSON.stringify(carrito));
            // Recargar para que la tabla y costos se redibujen sin el producto eliminado
            location.reload(); 
        });
    });

    // LÓGICA DE VALIDACIÓN FINAL -
    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function (event) {
            event.preventDefault();
            event.stopPropagation();
            validarFormulario(checkoutForm, carrito);
        }, false);
    }
    
    // Inicializar lógica del modal de pago
    handlePagoModal();

});