const BASE_URL = 'https://swapi.py4e.com/api/';

export const fetchAll = async <T>(endpoint: string): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchById = async <T>(endpoint: string, id: string | number): Promise<T> => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}/${id}/`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint} with ID ${id}: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
