/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";


const ourCostumer = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You need to login first');
      // Navigate to login page if token doesn't exist
      navigate('/Login');
    }
  }, [navigate]);

  return (
    <div>Our-Costumer</div>
  )
}

export default ourCostumer