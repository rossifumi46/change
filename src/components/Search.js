import { useState } from 'react';
import api from '../api';
import './Search.css';

const Search = (props) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState([]);

  function handleChange(e) {
    setQuery(e.target.value);
    api.getPoem(e.target.value)
      .then((response) => {
        setResult(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="Search">
      <h1>Поиск</h1>
      <input type="text" onChange={handleChange} value={query}/>
      <div className="result">
          {result.map((poem) => {
            const queryElem = <span style={{color : 'red'}}>{query}</span>;
            const text = poem.fields.text;
            // const index = text.indexOf(query);
            // const indexStart = text.slice(0, index).lastIndexOf('\n');
            // const indexEnd = text.slice(index).indexOf('\n');
            const textArray = text.split('\n');
            const index = textArray.findIndex(line => line.includes(query) ? line : false);
            const line = textArray[index];
            if (index > -1) {
              console.log(index);
              const ind = textArray[index].indexOf(query);
              return (
                <div className="poem-item">
                  <p>.......</p>
                  <p>{textArray[index-1]}</p>
                  <p>{line.slice(0, ind)}{queryElem}{line.slice(ind+query.length)}</p>
                  <p>{textArray[index+1]}</p>
                  <p>.......</p>
                </div>
              )
            }
          })}
      </div>      
    </div>
  )
}

export default Search;