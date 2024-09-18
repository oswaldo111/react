 

import ProductoComponent from '@/components/ProductoComponent';
import React from 'react';
import { View, StyleSheet } from 'react-native';


const ProductosScreen = () => {
  return (
    <View style={styles.container}>
      <ProductoComponent />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProductosScreen;
