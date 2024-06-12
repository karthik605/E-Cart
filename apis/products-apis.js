const { Product, User, Cart } = require('../model/Product');
const products_all = async (req, res) => {
    try {
        const products = await Product.find();
        console.log("Data Sent");
        res.json(products)
    }
    catch (error) {
        console.log("Fetch error :-", error)
        res.json({ 'message': error })
    }
}
const login = async (req, res) => {
    try {
        const { u_u_email, u_pwd } = req.body;
        const user = await User.findOne({ u_u_email: u_u_email, u_pwd: u_pwd });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        res.json({ message: "Login successful", user: user });
    } catch (error) {
        console.log("Login error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const createUser = async (req, res) => {
    try {
        const { u_name, u_pwd, u_u_email, u_addr, u_u_contact } = req.body;
        const user = new User({
            u_id: Math.floor(Math.random() * 100000),
            u_name,
            u_pwd,
            u_u_email,
            u_addr,
            u_u_contact
        });
        await user.save();
        res.json({ message: "User created successfully" });
    } catch (error) {
        console.log("Create user error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const insertCart = async (req, res) => {
    try {
        const { p_id, p_img, p_cost, u_name } = req.body;
        const cart = new Cart({
            p_id,
            p_img,
            p_cost,
            u_name,
            qty: 1
        });
        await cart.save();
        res.json({ message: "Cart item added successfully" });
    } catch (error) {
        console.log("Insert cart error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const fetchCart = async (req, res) => {
    try {
        const u_name = req.query.u_name;
        const cartItems = await Cart.find({ u_name });
        res.json(cartItems);
    } catch (error) {
        console.log("Fetch cart error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateCart = async (req, res) => {
    const p_id = req.body.p_id;
    const u_name = req.body.u_name;
    const obj = { qty: req.body.qty };

    try {
        const cart = await Cart.updateOne({ p_id, u_name }, { $set: obj });

        if (cart.nModified === 0) {
            console.log(`Record not updated for user ${u_name}`);
            return res.status(404).json({ cartUpdate: 'Record Not found' });
        }

        console.log(`Cart data for ${u_name} updated`);
        res.json({ cartUpdate: 'success' });
    } catch (error) {
        console.log("Update cart error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
const deleteCart = async (req, res) => {
    const p_id = req.body.p_id;
    const u_name = req.body.u_name;

    try {
        const cart = await Cart.findOneAndDelete({ p_id, u_name });

        if (!cart) {
            console.log(`Record not found for user ${u_name} and product ${p_id}`);
            return res.status(404).json({ cartDelete: 'Record Not found' });
        }

        console.log(`Cart data for ${u_name} and product ${p_id} deleted`);
        res.json({ cartDelete: 'success' });
    } catch (error) {
        console.log("Delete cart error :-", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
module.exports = {
    products_all,
    login,
    createUser,
    insertCart,
    fetchCart,
    updateCart,
    deleteCart
}