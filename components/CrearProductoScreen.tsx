import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { crearProducto } from '../constants/api'; // Asegúrate de que esta ruta sea correcta

const CrearProductoScreen: React.FC = () => {
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCrearProducto = async () => {
    setLoading(true);
    setError(null);

    // Validación simple del precio
    const precio = parseFloat(nuevoProducto.precio);
    if (isNaN(precio) || precio <= 0) {
      setLoading(false);
      setError('El precio debe ser un número positivo.');
      return;
    }

    const producto = {
      nombre: nuevoProducto.nombre,
      descripcion: nuevoProducto.descripcion,
      precio,
    };

    try {
      await crearProducto(producto);
      Alert.alert('Éxito', 'Producto creado con éxito');
      setNuevoProducto({ nombre: '', descripcion: '', precio: '' }); // Limpiar formulario
    } catch (error) {
      console.error('Error al crear el producto:', error);
      setError('No se pudo crear el producto. Inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Crear Nuevo Producto</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={nuevoProducto.nombre}
        onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, nombre: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={nuevoProducto.descripcion}
        onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, descripcion: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={nuevoProducto.precio}
        keyboardType="numeric"
        onChangeText={(text) => setNuevoProducto({ ...nuevoProducto, precio: text })}
      />
      <Button title="Crear Producto" onPress={handleCrearProducto} disabled={loading} />
      {loading && <Text>Creando producto...</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default CrearProductoScreen;
