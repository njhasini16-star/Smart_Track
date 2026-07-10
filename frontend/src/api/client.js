export async function api(url, options = {}) {
    const res = await fetch(`http://localhost:3000${url}`, {
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