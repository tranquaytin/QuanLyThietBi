// TodoItem.js
import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";

const TodoItem = ({ title, image, price }) => {
    return (
        <View style={styles.gridItem}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.todoItem}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
        </View>
    );
}

export default TodoItem;

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    todoItem: {
        fontSize: 15,
        textAlign: 'center',
    },
    price: {
        fontSize: 15,
        color: 'green',
        textAlign: 'center',
    },
});
