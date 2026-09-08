const API_BASE_URL = "http://localhost:8080";

export async function getTickets() {

    const response = await fetch(
        `${API_BASE_URL}/api/tickets`
    );

    if (!response.ok) {

        throw new Error(
            `Failed to fetch tickets: ${response.status}`
        );

    }

    return await response.json();
}