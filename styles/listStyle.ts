import { StyleSheet } from "react-native";

export const listStyles = StyleSheet.create({
    container: {
        padding: 10,
    },
    pharmacy: {
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        paddingBottom: 10,
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    search: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        padding: 10,
        margin: 10,
        marginTop: 0,
    },
    searchBtn: {
        backgroundColor: '#C2C96D',
        marginHorizontal: 10,
        padding: 10,
        borderRadius: 5,
    },
    btnText: {
        color: "#000000",
        fontWeight: "600",
        textAlign: "center",
        fontSize: 20,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    openStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'green',
    },
    closeStat: {
        marginTop: 5,
        fontSize: 16,
        color: 'red'
    }
});