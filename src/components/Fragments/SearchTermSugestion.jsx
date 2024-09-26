import { useState, useEffect } from 'react';
// import axios from 'axios';

const SearchTermSugestion = () => {
  const [query, setQuery] = useState('');
//   const [suggestions, setSuggestions] = useState([]);

  // Fungsi untuk menangani perubahan input pengguna
  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  // Gunakan useEffect untuk memicu request ke backend setiap kali query berubah
//   useEffect(() => {
//     if (query.length > 0) {
//       axios
//         .get(`http://localhost:5000/suggestions?q=${query}`) // Pastikan backend Anda berjalan di port 5000
//         .then((response) => setSuggestions(response.data)) // Simpan hasil suggestion dari API
//         .catch((err) => console.error(err));
//     } else {
//       setSuggestions([]); // Jika tidak ada input, kosongkan suggestions
//     }
//   }, [query]);

  return (
    <div className="relative w-1/2 mx-auto mt-10">
      {/* Input untuk mengetikkan term pencarian */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none"
        placeholder="Search..."
      />
      
      {/* Menampilkan hasil suggestion */}
      {/* {suggestions.length > 0 && (
        <ul className="absolute bg-white border border-gray-300 w-full mt-1 rounded-lg">
          {suggestions.map((suggestion, index) => (
            <li key={index} className="p-2 hover:bg-gray-100">
              {suggestion.term}
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default SearchTermSugestion;
