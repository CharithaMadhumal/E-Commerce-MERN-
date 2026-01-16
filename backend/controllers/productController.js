import Product from '../models/Product.js'

export const getProducts = async (req, res) => {

    try {

        const { category } = req.query;
        let query = {};

        if (category) {
            query.category = category;
        }

        const products = await Product.find(query);
        res.json(products);

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: message.error });
    }
}

export const addProduct = async (req, res) => {

    const product = new Product(req.body);

    try {

        const products = await product.save();
        res.status(200).json({ success: true, products, Message: "Products Added" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: message.error });
    }
}

export const updateProduct = async (req, res) => {

    try {
        const updateProducts = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.status(200).json({ success: true, updateProducts, Message: "Updated Products" });


    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: message.error });
    }
}

export const deleteProduct = async (req, res) => {
    try {

        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, Message: "Product deleted" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: message.error });
    }
}