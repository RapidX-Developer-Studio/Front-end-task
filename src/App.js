import { useEffect, useState } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from "@mui/material";
import Paper from "@mui/material/Paper";

export default function App() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const allCategories = [
    ...new Set(categories.map(product => product.category))
  ];

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dummyjson.com/products")
      .then(response => {
        setCategories(response.data.products);
        setSelectedCategory(allCategories[0]);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const filteredCategories = selectedCategory
    ? categories.filter(product => product.category === selectedCategory)
    : categories;

  return (
    <div>
      <div>
        <div>
          <p>Category dropdown</p>
        </div>
        <select
          value={selectedCategory}
          onChange={event => setSelectedCategory(event.target.value)}
        >
          <option value="">All</option>
          {allCategories.map(category =>
            <option key={category} value={category}>
              {category}
            </option>
          )}
        </select>
      </div>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading
              ? <TableRow>
                  <TableCell colSpan={3}>Loading...</TableCell>
                </TableRow>
              : filteredCategories.map(product =>
                  <TableRow key={product.id}>
                    <TableCell>
                      {product.title}
                    </TableCell>
                    <TableCell>
                      {product.category}
                    </TableCell>
                    <TableCell>
                      {product.price}
                    </TableCell>
                  </TableRow>
                )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
