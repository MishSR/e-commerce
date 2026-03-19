import Cart from '../models/Cart.js';


async function getCarts(req, res) {
    try {
        const carts = await Cart.find()
        .populate('user')
        .populate('items.product');
        res.json(carts);
    } catch (error) {
        console.error(error);
    }
}

async function getCartById(req, res) {
    try {
         const id = req.params.id;
        const cart = await Cart.findById(id)
        .populate('user')
        .populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
}

async function getCartByUser(req, res) {
    try {
        const userId = req.params.id;
        const cart = await Cart.findOne({ user: userId })
        .populate('user')
        .populate('items.product');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found for this user' });
        }
        res.json(cart);
    } catch (error) {
        console.error(error);
    }
}