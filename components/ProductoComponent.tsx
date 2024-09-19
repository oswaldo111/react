import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import { buscarProductos } from '../constants/api';

const ProductoComponent = () => {
  const [productos, setProductos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    setError(null); // Reiniciar el error antes de la solicitud
    try {
      const productosData = await buscarProductos({ nombre: '', skip: 0, take: 10 });
      console.log('Datos de productos:', productosData);
      if (!productosData || productosData.length === 0) {
        setError('No se encontraron productos.');
      } else {
        setProductos(productosData);
      }
    } catch (error) {
      console.error('Error al buscar productos:', error);
      setError('No se pudo cargar la lista de productos.');
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
      <Button title="Buscar productos" onPress={cargarProductos} />
      {productos.length > 0 ? (
        <FlatList
          data={productos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.boldText}>Nombre: {item.nombreOUCR}</Text>
              <Text >Descripción: {item.descripcionOUCR}</Text>
              <Text>Precio: {item.precioOUCR}</Text>
            </View>
          )}
        />
      ) : (
        <Text>No se encontraron productos.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  itemContainer: {
    marginVertical: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
});

export default ProductoComponent;
