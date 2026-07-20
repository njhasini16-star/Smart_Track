export async function api(url, options = {}) {
    const API_URL = import.meta.env.VITE_API_URL;
    const res = await fetch(`${API_URL}${url}`, {
        credentials: "include",
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    if (!res.ok) {
        throw new Error(await res.text());
    }

    return res.json();
}