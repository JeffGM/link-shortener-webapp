export default function (base, generateId) {
    const urlId = generateId();
    return `${base}/${urlId}`;
}