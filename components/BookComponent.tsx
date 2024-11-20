import react from "react";
import { View, StyleSheet,FlatList,Text } from "react-native";
import { createContext, useState } from "react";

const BookComponent = () => {
  const [books, setBooks] = useState(["Book1", "Book2", "Book3"]);

  const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </View>
  );

  return (
    <View>
      <FlatList
        data={books}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default BookComponent
