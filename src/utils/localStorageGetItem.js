export default function(key) {
    return JSON.parse(localStorage.getItem(key)) || {}; 
}