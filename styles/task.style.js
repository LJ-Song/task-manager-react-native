import { StyleSheet } from "react-native";

const styles = StyleSheet.create({ 
    container: { 
        flex: 1, 
        padding: 25, 
        marginTop: 25, 
    }, 
    headTitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        marginBottom: 20, 
        flexDirection: 'column'
    }, 
    heading: { 
        fontSize: 25, 
        fontWeight: "bold", 
        marginBottom: 7, 
        color: "green", 
    }, 
    input: { 
        borderWidth: 3, 
        borderColor: "#ccc", 
        padding: 8, 
        marginBottom: 10, 
        borderRadius: 10, 
        fontSize: 15, 
    }, 
    addButton: { 
        backgroundColor: "green", 
        padding: 8, 
        borderRadius: 5, 
        marginBottom: 10, 
    }, 
    addButtonText: { 
        color: "white", 
        fontWeight: "bold", 
        textAlign: "center", 
        fontSize: 15, 
    }, 
    title: {  
        justifyContent: "space-between", 
        alignItems: "left", 
        marginBottom: 15, 
        fontSize: 18, 
    }, 
    itemList: { 
        fontSize: 18, 
        padding: 8
    }, 
    taskButtons: { 
        flexDirection: "row",
        alignSelf: 'flex-end'
    }, 
    editButton: { 
        marginRight: 15, 
        marginLeft: 15, 
        color: "green", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    deleteButton: { 
        marginRight: 15, 
        marginLeft: 15, 
        color: "red", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    detailButton: { 
        marginRight: 15, 
        color: "black", 
        fontWeight: "bold", 
        fontSize: 12, 
    }, 
    checkbox: {
        flexDirection: "row",
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