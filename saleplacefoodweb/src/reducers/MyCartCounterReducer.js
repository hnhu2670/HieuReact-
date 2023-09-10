const MyCartCounterReducer = (currentState, action) => {
    switch (action.type) {
        case "inc":
            return currentState + action.payload;
        case "dec":
            return currentState - action.payload;
        case "update":
            return action.payload;
        default:
            return currentState;
    }
}
export default MyCartCounterReducer;