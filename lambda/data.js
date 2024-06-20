exports.handler = async (event) => {
    // Simulando una respuesta de transacción con al menos 4 campos
    const transactionResponse = {
        transactionId: "123456",
        amount: 100.00,
        status: "completed",
        timestamp: new Date().toISOString()
    };
    
    return transactionResponse;
};
