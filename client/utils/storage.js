export function loadSavedLoginData(clientId, validationKey) {
  if (!window.localStorage) {
    return false;
  }
  try {
    const logins = JSON.parse(window.localStorage.getItem('logins'));
    for(let i = 0; i < logins.length; i++) {
      if (logins[i].clientId === clientId && logins[i].validationKey === validationKey) {
        return logins[i].email;
      }
    }
    return false;
  } catch(e) {
    return false;
  }
}

export function saveLoginData(clientId, validationKey, email) {
  if (!window.localStorage) {
    return false;
  }
  const loginsRawData = window.localStorage.getItem('logins');
  const logins = loginsRawData ? JSON.parse(loginsRawData) : [];
  let updated = false;
  for(let i = 0; i < logins.length; i++) {
    if (logins[i].clientId === clientId && logins[i].validationKey === validationKey) {
      logins[i].email = email;
      updated = true;
    }
  }
  if (!updated) {
    logins.push({
      clientId,
      validationKey,
      email,
    });
  }
  window.localStorage.setItem('logins', JSON.stringify(logins));
  return true;
}
