import axios from 'axios';

// Configura la URL base de tu API
const apiUrl = 'http://productosOUCR.somee.com'; // Cambia esto por tu URL real

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Content-Type': 'application/json',
    // Si usas autenticación, puedes agregar un token aquí
    // 'Authorization': `Bearer ${token}`,
  },
});

// Ejemplo de una solicitud GET para obtener un producto por ID
export const obtenerProductoPorId = async (id) => {
  try {
    const response = await api.get(`/product/${id}`);
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    throw error;
  }
};

// Ejemplo de una solicitud POST para buscar productos
export const buscarProductos = async (query) => {
    try {
      const response = await api.post('/product/search', {
        Nombre_Like: "",
        Skip: query.skip || 0,
        Take: query.take || 10,
        SendRowCount: query.sendRowCount || 2
      });
      console.log('Respuesta de la API:', response.data); // Verifica aquí el formato
      // Extrae el array de productos de la propiedad 'data'
      if (Array.isArray(response.data.data)) {
        return response.data.data; // Devolver el array de productos
      } else {
        throw new Error('La respuesta no contiene un array de productos');
      }
    } catch (error) {
      console.error('Error al buscar pddroductos:', error);
      throw error;
    }
  };
  

// Ejemplo de una solicitud POST para crear un nuevo producto
export const crearProducto = async (producto) => {
  try {
    const response = await api.post('/product', {
      NombreOUCR: producto.nombre,
      DescripcionoOUCR: producto.descripcion,
      PrecioOUCR: producto.precio,
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      // La solicitud se realizó y el servidor respondió con un código de estado que no está en el rango de 2xx
      console.error('Error en la respuesta del servidor:', error.response.data);
      console.error('Código de estado:', error.response.status);
      console.error('Cabeceras:', error.response.headers);
    } else if (error.request) {
      // La solicitud se realizó pero no se recibió respuesta
      console.error('No se recibió respuesta:', error.request);
    } else {
      // Algo sucedió al configurar la solicitud
      console.error('Error al configurar la solicitud:', error.message);
    }
    console.error('Error completo:', error);
    throw error;
  }
};


export default api;
