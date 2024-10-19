const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transaction');

// Middleware for input validation
const validateTransactionInput = (req, res, next) => {
  const { walletAddress, amount, type } = req.body;
  if (!walletAddress || !amount || !type) {
    return res.status(400).json({ error: 'walletAddress, amount, and type are required' });
  }
  if (isNaN(amount)) {
    return res.status(400).json({ error: 'amount must be a number' });
  }
  if (!['deposit', 'withdraw'].includes(type)) {
    return res.status(400).json({ error: 'type must be either deposit or withdraw' });
  }
  next();
};

// POST /api/transactions (handles deposits)
// POST /api/transactions (handles deposits)
router.post('/', validateTransactionInput, async (req, res) => {
  const { walletAddress, amount, type, vaultName } = req.body; // Include vaultName
  console.log("body",req.body);
  const numericAmount = parseFloat(amount); // Ensure amount is a number

  try {
    let transaction = await Transaction.findOne({ walletAddress });

    if (!transaction) {
      transaction = new Transaction({
        walletAddress,
        totalAmount: numericAmount,
        transactions: [{ type, amount: numericAmount, vaultName }]
      });
    } else {
      // Update existing record
      transaction.totalAmount += type === 'deposit' ? numericAmount : 0;
      transaction.transactions.push({ type, amount: numericAmount,vaultName });
    }

    await transaction.save();
    res.json(transaction);
  } catch (error) {
    console.error('Error saving transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});



// POST /api/transactions/withdraw (handles withdrawals)
router.post('/withdraw', async (req, res) => {
  const { walletAddress, amount, vaultName } = req.body; // Extract wallet address, totalAmount, and vaultName from request body
  console.log("Withdrawamount:",amount);
  try {
    // Find the wallet's transactions
    const transaction = await Transaction.findOne({ walletAddress });
    if (!transaction) {
      return res.status(404).json({ message: 'No transactions found for this wallet' });
    }

    // Perform withdraw logic
    const withdrawAmount = parseFloat(amount); // Ensure totalAmount is converted to a number
    console.log("Withdraw amount:", withdrawAmount);

    // Check if withdrawAmount is a valid number and greater than 0
    if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal amount' });
    }

    // Ensure the wallet has enough funds to withdraw
    if (transaction.totalAmount < withdrawAmount) {
      return res.status(400).json({ message: 'Insufficient funds' });
    }

    // Update the total amount in the wallet by subtracting the withdrawal amount
    transaction.totalAmount -= withdrawAmount;
    console.log("Total amount after withdrawal:", transaction.totalAmount);

    // Add a withdrawal transaction to the transactions array
    transaction.transactions.push({
      type: 'withdraw',
      amount: withdrawAmount, // Use withdrawAmount to ensure it's correctly passed
      vaultName, // Include vaultName if needed
    });

    // Save the updated transaction document
    await transaction.save();

    res.status(200).json(transaction); // Return the updated transaction document
  } catch (error) {
    console.error('Error processing withdrawal:', error);
    res.status(500).json({ error: 'Server error' });
  }
});




// GET /api/transactions/:walletAddress
router.get('/:walletAddress', async (req, res) => {
  const { walletAddress } = req.params; // Extract wallet address from request params
  try {
    const transaction = await Transaction.findOne({ walletAddress: walletAddress }); // Explicit query
    if (!transaction) {
      return res.status(404).json({ message: 'No transactions found for this wallet' });
    }
    res.json(transaction);
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
