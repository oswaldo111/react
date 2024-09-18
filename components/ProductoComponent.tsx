import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { obtenerProductoPorId, buscarProductos } from '../constants/api.js'; // Ajusta la ruta según la ubicación del archivo `api.js`

const ProductoComponent = () => {
  const [producto, setProducto] = useState<any>(null);
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cargarProducto = async () => {
      try {
        const data = await obtenerProductoPorId(6);
        setProducto(data);
      } catch (error) {
        console.error('Error al obtener producto:', error);
        setError('No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };

    cargarProducto();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await buscarProductos({ nombre: 'Producto', skip: 0, take: 10 });
      setProductos(data.Data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setError('No se pudo cargar la lista de productos');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 20 }}>
      {producto && (
        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18 }}>Producto por ID:</Text>
          <Text>Nombre: {producto.NombreOUCR}</Text>
          <Text>Descripción: {producto.DescripcionOUCR}</Text>
          <Text>Precio: {producto.PrecioOUCR}</Text>
        </View>
      )}

      <Button title="Buscar productos" onPress={cargarProductos} />

      {productos.length > 0 && (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.Id.toString()}
          renderItem={({ item }) => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Nombre: {item.NombreOUCR}</Text>
              <Text>Descripción: {item.DescripcionOUCR}</Text>
              <Text>Precio: {item.PrecioOUCR}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default ProductoComponent;
