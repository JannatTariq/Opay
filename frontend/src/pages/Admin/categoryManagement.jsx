import { useState,useEffect } from 'react';
import axios from 'axios';
import styles from '../../adminDashboard.module.css';
import Sidebar from './Sidebar';



const CategoryManagement = () => {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newCategory, setNewCategory] = useState({
      name: "",
      description: "",
    });
  
  
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };
    function handleDeleteCategory(categoryId) {
      setLoading(true);
      // Send a DELETE request to the backend API to delete the category
      fetch(`http://localhost:3000/api/categories/${categoryId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // If the delete request was successful, remove the category from the list of categories
          const updatedCategories = categories.filter((category) => category._id !== categoryId) ;
          setCategories(updatedCategories);
          setSelectedCategory(null);
        } else {
          throw new Error('Failed to delete category');
        }
      })
      .catch(error => {
        console.error(error);
      });
      setLoading(false);
    }
    const handleAddCategory = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/api/categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCategory),
        });
        if (response.ok) {
   // Create a new object that conforms to the Category interface
   const newCategoryObject = {
    _id: newCategory.name,
    name: newCategory.name,
    description: newCategory.description
  };
  // Update categories state with the new category object
  setCategories(categories => [...categories, newCategoryObject]);        
  setNewCategory({name: "", description: "" });
        } else {
          throw new Error("Failed to add category");
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    
    useEffect(() => {
      fetchCategories();
    }, []);
    return(
      <div>
<div className="row">
        <div className="col-12 col-md-2">
          <Sidebar />
        </div>

        <div className="col-12 col-md-10">
    <div className={styles['admin-dashboard__section']}>
<h2>Category Management</h2>
<ul className={styles['admin-dashboard__product-list']}>
  {categories.map((category) => (
    <li
      key={category._id}
      className={styles['admin-dashboard__category-item']}
      onClick={() => handleCategorySelect(category)}
    >
      {category.name}
    </li>
  ))}
</ul>
{selectedCategory && (
  <div className={styles['admin-dashboard__section']}>
    <h3>{selectedCategory.name}</h3>
    <p>{selectedCategory.description}</p>
    <button
      className={styles['delete-button']}
      onClick={() => handleDeleteCategory(selectedCategory._id)}
    >
      Delete Category
    </button>
  </div>
)}
<div className={styles['admin-dashboard__section']}>
  <h2>Add Category</h2>
  <form onSubmit={handleAddCategory}>
    <div className={styles['container']}>
      <div>
    <label className={styles['label']}>
      Name:
      <input
        className={styles['input']}
        type="text"
        value={newCategory.name}
        onChange={(e) =>
          setNewCategory({ ...newCategory, name: e.target.value })
        }
      />
    </label>
    </div>
    <div>
    <label className={styles['label']}>
      Description:
      <input
        className={styles['input']}
        type="text"
        value={newCategory.description}
        onChange={(e) =>
          setNewCategory({
            ...newCategory,
            description: e.target.value,
          })
        }
      />
    </label>
    </div>
    <button className={styles['success-button']} type="submit">
      Add Category
    </button>
    </div>
  </form>
</div>
</div></div></div></div>);
};

export default CategoryManagement;