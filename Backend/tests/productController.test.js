const { postProduct } = require('../Controllers/Admin');
const Product = require('../Models/Product');

// Mock the Product model
jest.mock('../Models/Product');

describe('postProduct Controller', () => {
    let req, res;

    beforeEach(() => {
        // Reset all mocks before each test
        jest.clearAllMocks();
        
        // Mock request object
        req = {
            body: {}
        };
        
        // Mock response object with chaining methods
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis()
        };
    });

    // Test successful product creation
    test('should create product successfully with all fields', async () => {
        // Arrange - Setup test data
        const productData = {
            title: 'Test Product',
            tags: ['electronics'],
            description: 'A test product',
            price: 99.99,
            oldPrice: 129.99,
            category: 'Electronics',
            brand: 'TestBrand',
            stock: 50,
            images: ['image1.jpg'],
            rating: 4.5,
            reviews: ['Great!']
        };

        req.body = productData;

        // Mock the saved product
        const mockSavedProduct = { _id: '123', ...productData };
        
        // Mock Product constructor and save method
        const mockSave = jest.fn().mockResolvedValue(mockSavedProduct);
        Product.mockImplementation(() => ({ save: mockSave }));

        // Act - Call the function
        await postProduct(req, res);

        // Assert - Check results
        expect(Product).toHaveBeenCalledWith(productData);
        expect(mockSave).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockSavedProduct);
    });

    // Test with only required fields
    test('should create product with only required fields', async () => {
        const productData = {
            title: 'Minimal Product',
            price: 49.99,
            category: 'Books'
        };

        req.body = productData;

        const mockSavedProduct = { _id: '456', ...productData };
        const mockSave = jest.fn().mockResolvedValue(mockSavedProduct);
        Product.mockImplementation(() => ({ save: mockSave }));

        await postProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith(mockSavedProduct);
    });

    // Test validation errors
    test('should return 400 when title is missing', async () => {
        req.body = {
            price: 99.99,
            category: 'Electronics'
        };

        await postProduct(req, res);

        expect(Product).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({
            message: "Title, price, and category are required."
        });
    });

    test('should return 400 when price is missing', async () => {
        req.body = {
            title: 'Test Product',
            category: 'Electronics'
        };

        await postProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    test('should return 400 when category is missing', async () => {
        req.body = {
            title: 'Test Product',
            price: 99.99
        };

        await postProduct(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
    });

    // Test database errors
    test('should return 500 when database save fails', async () => {
        const productData = {
            title: 'Test Product',
            price: 99.99,
            category: 'Electronics'
        };

        req.body = productData;

        const mockError = new Error('Database connection failed');
        const mockSave = jest.fn().mockRejectedValue(mockError);
        Product.mockImplementation(() => ({ save: mockSave }));

        // Mock console.error to avoid cluttering test output
        const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

        await postProduct(req, res);

        expect(consoleErrorSpy).toHaveBeenCalledWith('Product Creation Error:', 'Database connection failed');
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Database connection failed'
        });

        consoleErrorSpy.mockRestore();
    });
});