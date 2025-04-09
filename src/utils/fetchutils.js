const getOptions = (path, setter, endpoint = 'http://localhost:3004') => {
  fetch(`${endpoint}/${path}/get-keys`, {
    method: 'GET',
  })
    .then(res => res.json())
    .then(res => {
      setter(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const getData = (path, key, setter, endpoint = 'http://localhost:3004') => {
  fetch(`${endpoint}/${path}/get`, {
    method: 'POST',
    body: JSON.stringify({key}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      setter(res);
    })
    .catch(err => {
      console.log(err);
    });
};

const saveData = (
  path,
  key,
  json,
  setter,
  endpoint = 'http://localhost:3004',
) => {
  fetch(`${endpoint}/${path}/save`, {
    method: 'POST',
    body: JSON.stringify({key, json}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(res => {
      setter(res);
    })
    .catch(err => {
      console.log(err);
    });
};
export {getOptions, getData,saveData};
