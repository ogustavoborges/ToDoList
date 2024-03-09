const key = "47252f5c27944730ba3aaba6e814c661";
const apiUrl = `https://crudcrud.com/api/${key}/tasks`;

async function findAll() {
  try {
    const response = await fetch(apiUrl);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function findById(id) {
  try {
    const response = await fetch(`${apiUrl}/${id}`);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function save(task) {
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    return await response.json();
  } catch (error) {
    throw error;
  }
}

async function update(task, id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
  } catch (error) {
    throw error;
  }
}

async function remove(id) {
  try {
    await fetch(`${apiUrl}/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    throw error;
  }
}
