import axios from 'axios';

// Configura la URL base de tu API
const apiUrl = 'https://localhost:7031'; // Cambia esto por tu URL real

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
        Nombre_Like: query.nombre,
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
      console.error('Error al buscar productos:', error);
      throw error;
    }
  };
  

// Ejemplo de una solicitud POST para crear un nuevo producto
export const crearProducto = async (producto) => {
  try {
    const response = await api.post('/product', {
      NombreOUCR: producto.nombre,
      DescripcionoOUCR: producto.descripcion,
      PrecioOUCR: producto.precio
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear el producto:', error);
    throw error;
  }
};

// Ejemplo de una solicitud PUT para editar un producto
export const editarProducto = async (producto) => {
  try {
    const response = await api.put('/product', {
      Id: producto.id,
      NombreOUCR: producto.nombre,
      DescripcionOUCR: producto.descripcion,
      PrecioOUCR: producto.precio
    });
    return response.data;
  } catch (error) {
    console.error('Error al editar el producto:', error);
    throw error;
  }
};

// Ejemplo de una solicitud DELETE para eliminar un producto
export const eliminarProducto = async (id) => {
  try {
    const response = await api.delete(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    throw error;
  }
};

export default api;
