const PROTOCOL = process.env.REACT_APP_PROTOCOL;
const HOST = process.env.REACT_APP_HOST;
const API_PORT = process.env.REACT_APP_API_PORT;

export const getPDFImage = async (pdf) => {
    // should make those Ids variables
    let form = pdf === "1" ? '5cb7851e250bd6638511cf5f': '5cb78614250bd6638511cf60';
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getImage/${form}`);

    const body = await response.json();
    return body;
}

export const getSavedPDFs = async () => {
    // should make those Ids variables
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getForms`);

    const body = await response.json();
    return body;
}

export const getSavedPDF = async (id) => {
    // should make those Ids variables
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getForm/${id}`);

    const body = await response.json();
    return body;
}

export const editSavedPDF = async (id, update) => {
    // should make those Ids variables

    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getForm/${id}`, {update});

    const body = await response.json();
    return body;
}

export const savePDF = async (data) => {
    // should make those Ids variables
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/postForm/`, requestOptions);

    const body = await response.json();
    return body;
}

export const deletePDF = async (id) => {
    // should make those Ids variables
    console.log('is Id correct', id)
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/deleteForm/${id}`, requestOptions);

    const body = await response.json();
    return body;
}

export const getBoxes = async () => {
    // should make those Ids variables
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getBoxes`);

    const body = await response.json();
    return body;
}

export const getFormBoxes = async () => {
    // should make those Ids variables
    // Probably need some kind of form id
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/getBoxes/:formId`);

    const body = await response.json();
    return body;
}


export const saveBox = async (data) => {
    // should make those Ids variables
    console.log(data)
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/postBox/`, requestOptions);

    const body = await response.json();
    return body;
}

export const deleteBox = async (id) => {
    // should make those Ids variables
    console.log('is Id correct', id)
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    };
    const response = await fetch(`${PROTOCOL}://${HOST}:${API_PORT}/api/deleteBox/${id}`, requestOptions);

    const body = await response.json();
    return body;
}
