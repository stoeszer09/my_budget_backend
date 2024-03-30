const combineCategoryTransactions = (transactions, categories) => {
  return categories.map(category => {
    let combined = category;
    combined.expense = transactions.reduce((total, transaction) => {
      if (transaction.categoryId === category.categoryId) {
        total = transaction.expense
      }
      return total
    }, 0)
    return combined
  })
}

module.exports = {
  combineCategoryTransactions
}