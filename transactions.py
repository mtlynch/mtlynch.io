import io

def total_transactions(transaction_list):
    for transaction in transaction_list:
        total_transactions = 0.0
        total_completed = 0.0
        if transaction.is_completed():
            total_transactions += transaction.amount()
            total_completed += transaction.amount()
        else:
            total_transactions += transaction.amount()

     return total_transactions, total_completed
