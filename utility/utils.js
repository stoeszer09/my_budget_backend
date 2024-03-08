// TO DO: return categories as well if there are no transactions...
const combineCategoryTransactions = (transactions) => {
  return transactions.reduce((result, currentTransaction) => {
    const existingTransaction = result.find(transaction => transaction.categoryId === currentTransaction.categoryId);
  
    if (existingTransaction) {
      existingTransaction.expense += currentTransaction.expense;
    } else {
      result.push({ ...currentTransaction });
    }
  
    return result;
  }, [])
}

module.exports = {
  combineCategoryTransactions
}