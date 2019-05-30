const URL = "http://192.168.1.88:8000/api";
const getToken = () => localStorage.getItem("token");

/**
 * Fetches vacancy profile by id from an api
 *
 * @param {Number} id vacancy id
 * @returns {Promise} Promise object represents operation result
 */
export const getVacancyProfile = id => {
  const token = getToken();
  return fetch(`${URL}/main/viewVacancy/${id}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Error while fetching: ${response.statusText}`);
    })
    .then(data => {
      const vacancy = data[0];

      const vacancyInfo = {
        id: vacancy.id,
        date: vacancy.date_create,
        company: vacancy.company,
        platform: vacancy.platforms,
        seniority: vacancy.seniorities,
        status: vacancy.status,
        location: vacancy.location,
        salary: vacancy.salary,
        link: vacancy.link,
        description: vacancy.opus,
        details: vacancy.details
      };

      return vacancyInfo;
    })
    .catch(error => console.log("error in fetch: ", error));
};
/**
 * Creates new vacancy object
 *
 * @param {Object} vacancy {}
 * @returns {Promise} Promise object represents operation result
 */
export const createNewVacancy = async vacancy => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/addNewVacancy`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(vacancy)
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};

/**
 *  Updates vacancy by id
 *
 * @param {Number} id vacancy id
 * @param {Object} vacancy {}
 * @returns {Promise} Promise object represents operation result
 */
export const updateVacancy = (id, vacancy) => {
  const token = getToken();
  return fetch(`${URL}/main/editVacancy/${id}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(vacancy)
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`${response.statusText}`);
    })
    .then(data => {
      const vacancy = data[0];

      const vacancyInfo = {
        id: vacancy.id,
        date: vacancy.date_create,
        company: vacancy.company,
        platform: vacancy.platforms,
        seniority: vacancy.seniorities,
        status: vacancy.status,
        location: vacancy.location,
        salary: vacancy.salary,
        link: vacancy.link,
        description: vacancy.opus,
        details: vacancy.details
      };

      return vacancyInfo;
    })
    .catch(error => console.log("error in fetch: ", error));
};

/**
 * Removes vacancy by id from an api
 *
 * @param {Number} id vacancy id
 * @returns {Promise} Promise object represents operation result
 */
export const deleteVacancy = async id => {
  const token = getToken();
  try {
    const response = await fetch(`${URL}/main/deleteVacancy/${id}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      }
    });
    if (response.ok) {
      return response.json();
    }
    throw new Error(`${response.statusText}`);
  } catch (error) {
    return console.log("error in fetch: ", error);
  }
};
