import React, {useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Dropdown from './DropDown';

const PRODUCTS = [
  {id: 1, name: 'T-shirt', category: 'Clothing', price: 20, brand: 'Nike'},
  {id: 2, name: 'Laptop', category: 'Electronics', price: 1200, brand: 'Dell'},
  {id: 3, name: 'Shoes', category: 'Footwear', price: 50, brand: 'Adidas'},
  {id: 4, name: 'Watch', category: 'Accessories', price: 100, brand: 'Casio'},
];
const productNames = PRODUCTS.map(product => product.name);
const FilterPage = () => {
  const [filteredProducts, setFilteredProducts] = useState(PRODUCTS);
  const [query, setQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]); // [min, max]
  const [selectedOption, setSelectedOption] = useState<string>('');

  const applyFilters = () => {
    const filtered = PRODUCTS.filter(product => {
      const matchesQuery = product.name
        .toLowerCase()
        .includes(query.toLowerCase());
      const withinPriceRange =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesQuery && withinPriceRange;
    });
    setFilteredProducts(filtered);
  };

  return (
    <View style={styles.container}>
      <Dropdown
        options={productNames}
        selectedValue={selectedOption}
        onValueChange={value => setSelectedOption(value)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceInput: {
    flex: 0.48,
  },
  product: {
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    marginVertical: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productDetails: {
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 16,
    color: '#999',
  },
});

export default FilterPage;
