export function getGreeting() {
  const currentTime = new Date();
  const currentHour = currentTime.getHours();

  if (currentHour < 12) {
    return 'Good morning';
  } else if (currentHour < 18) {
    return 'Good afternoon';
  } else {
    return 'Good evening';
  }
}

export const convertToForm = payload => {
  const keys = Object.keys(payload);
  let formData = new FormData();
  keys.map(key => {
    formData.append(key, payload[key]);
  });
  return formData;
};
