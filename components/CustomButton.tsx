import { StyleSheet, SafeAreaView, Text,Button,View } from "react-native";

interface ButtonProps {
    backgroundColor: string
}

const CustomButton = (() =>{
      return (
      <View style={styles.container}>
        <Button color={'black'} title = "Increment"/>
        </View>  
      );
    })
  
  
  const styles = StyleSheet.create({
    container: {
     // flex: 1,
      justifyContent: "space-around",
      backgroundColor: "green",
      flexDirection:'row',
      borderRadius:50
     // padding: 8,
    },
    left:{
      justifyContent:"flex-start",
  
    },
    right:{
      justifyContent:"flex-end"
  
    },
    paragraph: {
      margin: 8,
      fontSize: 16,
      textAlign: "center",
    },
    h1: {
      margin: 28,
      fontSize: 36,
      fontWeight: "bold",
      textAlign: "center",
    },
    h2: {
      margin: 16,
      fontSize: 28,
      fontWeight: "bold",
      textAlign: "center",
    },
  });
  
  export default CustomButton