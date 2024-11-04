async function updateOperationCount(id, newCount, endpoint, element) {
    const response = await fetch(`${endpoint}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ count: newCount }),
    });

    if (response.ok) {
        element.placeholder = newCount;
    } else {
        console.error('Ошибка при обновлении:', response.statusText);
    }
};

export {updateOperationCount};

const getData = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
};

export {getData};