// src/__tests__/Home.test.tsx
import { render, screen, fireEvent } from "@testing-library/react";
import Home from "../Pages/Home";
import { BrowserRouter } from "react-router-dom";

// 🧪 Mock Zustand store
jest.mock("../Store/Products", () => ({
  productStore: jest.fn()
}));

const mockProducts = [
  {
    _id: "1",
    title: "Adidas Runner",
    price: 1999,
    oldPrice: 2999,
    category: "Shoes",
    brand: "Adidas",
    stock: 5,
    images: ["https://example.com/img.jpg"],
    rating: 4.3,
    tags: ["new", "popular"]
  }
];

describe("Home Component", () => {
  it("renders products from store", () => {
    const mockGetProducts = jest.fn();
    const mockGetFilteredProducts = jest.fn();

    // Mock Zustand return
    require("../Store/Products").productStore.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      getProducts: mockGetProducts,
      getFilteredProducts: mockGetFilteredProducts
    });

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText("Adidas Runner")).toBeInTheDocument();
    expect(screen.getByText("₹1,999")).toBeInTheDocument();
    expect(screen.getByText("Shoes • Adidas")).toBeInTheDocument();
  });

  it("shows loading state", () => {
    require("../Store/Products").productStore.mockReturnValue({
      products: [],
      loading: true,
      error: null,
      getProducts: jest.fn(),
      getFilteredProducts: jest.fn()
    });

    render(<Home />, { wrapper: BrowserRouter });

    expect(screen.getByText("Loading products...")).toBeInTheDocument();
  });

  it("shows error state", () => {
    require("../Store/Products").productStore.mockReturnValue({
      products: [],
      loading: false,
      error: "Something went wrong",
      getProducts: jest.fn(),
      getFilteredProducts: jest.fn()
    });

    render(<Home />, { wrapper: BrowserRouter });

    expect(screen.getByText(/Error: Something went wrong/i)).toBeInTheDocument();
  });

  it("calls getFilteredProducts when Apply Filters is clicked", () => {
    const mockGetFilteredProducts = jest.fn();

    require("../Store/Products").productStore.mockReturnValue({
      products: mockProducts,
      loading: false,
      error: null,
      getProducts: jest.fn(),
      getFilteredProducts: mockGetFilteredProducts
    });

    render(<Home />, { wrapper: BrowserRouter });

    // Select Shoes category
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Shoes" }
    });

    // Click Apply Filters
    fireEvent.click(screen.getByText("Apply Filters"));

    expect(mockGetFilteredProducts).toHaveBeenCalledWith({ category: "Shoes" });
  });
});
