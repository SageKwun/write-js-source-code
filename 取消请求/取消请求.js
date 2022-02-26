// xhr
const xhr = new XMLHttpRequest();
xhr.abort();

// fetch
const controller = new AbortController();
let signal = controller.signal;
fetch(url, { signal });
controller.abort();

// axios
