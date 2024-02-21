import axios from 'axios';

const fetchPosts = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        return response.data;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
};

export { fetchPosts };
