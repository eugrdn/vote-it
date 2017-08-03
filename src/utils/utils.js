import shortid from 'shortid';

export const getClientId = () => {
  try {
    let id = localStorage.getItem('clientId');
    if (!id) {
      id = shortid.generate();
      localStorage.setItem('clientId', id);
    }
    return id;
  }
  catch (e) {
    alert(`Turn Off "Private Browsing Mode", please.`);
  }
}
