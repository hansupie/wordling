import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY

const getRandomWord = () => {
  const options = {
    method: 'GET',
    url: 'https://random-words5.p.rapidapi.com/getRandom',
    params: {wordLength: '5'},
    headers: {
      'x-rapidapi-host': 'random-words5.p.rapidapi.com',
      'x-rapidapi-key': api_key
    }
  };
  const request = axios.request(options)
  return request.then(response => response.data)
}

export default { getRandomWord }