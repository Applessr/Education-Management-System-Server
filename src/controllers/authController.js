const authController = {};


authController.login = async (req, res, next) => {
    try {
        res.status(200).json({message: 'Login'})

    } catch (error) {
        console.log('Error from login', error)
        next(error);
    }
}

module.exports = authController;