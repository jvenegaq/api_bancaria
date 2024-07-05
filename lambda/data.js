// data.js
exports.handler = async (event) => {
    const transactionResponse = {
        transactionId: "123456",
        amount: 100.00,
        status: "completed",
        timestamp: new Date().toISOString()
    };
    
    return {
        statusCode: 200,
        body: JSON.stringify(transactionResponse)
    };
};
