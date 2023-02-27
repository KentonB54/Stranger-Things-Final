import { config } from '../config';

export const getAllPosts = async () => {
    try {
        const response = await fetch (`${config.apiLink}/${config.cohort}/posts`);
        const {data: {posts}} = await response.json();
        return {data:{posts}} 
        } catch (error) {
            console.log(error)
        } 
}


