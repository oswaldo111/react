import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { obtenerProductoPorId, buscarProductos } from '../constants/api';

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
      console.log('Datos de productos:', data); // Verifica la estructura aquí
      // Asegúrate de que data.Data sea un array de productos
      if (Array.isArray(data.Data)) {
        setProductos(data.Data);
      } else {
        console.error('La respuesta no contiene un array de productos');
        setError('La respuesta del servidor no es válida');
      }
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
    <View style={styles.container}>
      {producto && (
        <View style={styles.productoContainer}>
          <Text style={styles.header}>Producto por ID:</Text>
          <Text>Nombre: {producto.nombreOUCR}</Text>
          <Text>Descripción: {producto.descripcionOUCR}</Text>
          <Text>Precio: {producto.precioOUCR}</Text>
        </View>
      )}

      <Button title="Buscar productos" onPress={cargarProductos} />

      {productos.length > 0 && (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.boldText}>Nombre: {item.nombreOUCR}</Text>
              <Text>Descripción: {item.descripcionOUCR}</Text>
              <Text>Precio: {item.precioOUCR}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  productoContainer: {
    marginBottom: 20,
  },
  itemContainer: {
    marginVertical: 10,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ProductoComponent;
