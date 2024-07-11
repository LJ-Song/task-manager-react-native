import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 40, 
        marginTop: 40, 
    }, 
    headTitle: { 
        fontSize: 24, 
        fontWeight: "bold", 
        marginBottom: 20, 
        flexDirection: 'column'
    }, 
    heading: { 
        fontSize: 30, 
        fontWeight: "bold", 
        marginBottom: 7, 
        color: "green", 
    }, 
    input: { 
        borderWidth: 3, 
        borderColor: "#ccc", 
        padding: 10, 
        marginBottom: 10, 
        borderRadius: 10, 
        fontSize: 18, 
    }, 
    addButton: { 
        backgroundColor: "green", 
        padding: 10, 
        borderRadius: 5, 
        marginBottom: 10, 
    }, 
    addButtonText: { 
        color: "white", 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 18, 
    }, 
    title: {  
        justifyContent: "space-between", 
        alignItems: "center", 
        marginBottom: 15, 
        fontSize: 18, 
    }, 
    itemList: { 
        fontSize: 19, 
    }, 
    taskButtons: { 
        flexDirection: "row", 
    }, 
    editButton: { 
        marginRight: 10, 
        marginLeft: 10, 
        color: "green", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    deleteButton: { 
        color: "red", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    detailButton: { 
        color: "black", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    checkbox: {
        maginRight:1,
    },
    loginContainer: {
        marginHorizontal: 20, 
        flex: 1, 
        justifyContent: 'center'
    }, 
    loginInput: {
        marginVertical: 4, 
        height: 50, 
        borderWidth: 1, 
        borderRadius: 4, 
        padding: 10, 
        backgroundColor: '#fff'
    }
}); 

export default styles;