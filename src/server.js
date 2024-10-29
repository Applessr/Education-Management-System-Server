require('dotenv').config();

try {
    const app = require('./app');
    const PORT = process.env.PORT || 6666;

    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
} catch (error) {
    console.error('Failed to load ', error);
}