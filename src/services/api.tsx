const API_BASE_URL = 'https://sweeping-seahorse-usefully.ngrok-free.app/';

const fetchData = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            headers: { Accept: 'application/json' },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

const fetchDetail = async (itemId: string, token: string | null) => {
    try {
        const response = await fetch(`${API_BASE_URL}${itemId}/show`, {
            headers: { Accept: 'application/json', Authorization: `${token}` },
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API fetch error:', error);
        throw error;
    }
};

export { API_BASE_URL, fetchData, fetchDetail };
