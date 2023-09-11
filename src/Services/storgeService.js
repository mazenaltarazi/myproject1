export class StorgeService {
     static set(key, value) {
        localStorage.setItem(key, value)
    }

     static get(key) {
        localStorage.getItem(key)
    }
}
