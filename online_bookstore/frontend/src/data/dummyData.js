export const dummyBooks = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        price: 12.99,
        description: "A story of decadence, excess, and the American Dream in the Roaring Twenties.",
        image: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
        category: "Classic",
        rating: 4.2,
        stock: 15
    },
    {
        id: 2,
        title: "To Kill a Mockingbird",
        author: "Harper Lee",
        price: 9.99,
        description: "A powerful story of racial injustice and the loss of innocence in the American South.",
        image: "https://m.media-amazon.com/images/I/71FxgtFKcUL._AC_UF1000,1000_QL80_.jpg",
        category: "Classic",
        rating: 4.8,
        stock: 8
    },
    {
        id: 3,
        title: "1984",
        author: "George Orwell",
        price: 10.99,
        description: "A dystopian social science fiction novel about totalitarianism and surveillance.",
        image: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
        category: "Science Fiction",
        rating: 4.5,
        stock: 12
    },
    {
        id: 4,
        title: "The Hobbit",
        author: "J.R.R. Tolkien",
        price: 14.99,
        description: "A fantasy novel about the adventures of Bilbo Baggins, a hobbit who embarks on an unexpected journey.",
        image: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
        category: "Fantasy",
        rating: 4.7,
        stock: 20
    },
    {
        id: 5,
        title: "The Alchemist",
        author: "Paulo Coelho",
        price: 11.50,
        description: "A philosophical book about a young Andalusian shepherd who dreams of finding a worldly treasure.",
        image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg",
        category: "Fiction",
        rating: 4.6,
        stock: 10
    }
];

export const dummyCategories = [
    { id: 1, name: "Fiction" },
    { id: 2, name: "Science Fiction" },
    { id: 3, name: "Fantasy" },
    { id: 4, name: "Classic" },
    { id: 5, name: "Mystery" },
    { id: 6, name: "Romance" },
    { id: 7, name: "Biography" },
    { id: 8, name: "Self-Help" }
];

export const dummyUser = {
    id: 1,
    username: "booklover42",
    email: "user@example.com",
    name: "Alex Johnson",
    address: "123 Book Street, Reading, UK",
    orders: [
        {
            id: 1001,
            date: "2025-11-15",
            total: 45.97,
            status: "Delivered",
            items: [
                { bookId: 1, quantity: 2, price: 12.99 },
                { bookId: 3, quantity: 1, price: 10.99 }
            ]
        },
        {
            id: 1002,
            date: "2025-11-01",
            total: 14.99,
            status: "Shipped",
            items: [
                { bookId: 4, quantity: 1, price: 14.99 }
            ]
        }
    ],
    wishlist: [2, 5],
    cart: [
        { bookId: 2, quantity: 1 },
        { bookId: 5, quantity: 2 }
    ]
};
