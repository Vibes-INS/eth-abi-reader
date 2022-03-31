export async function readFile<T extends string | ArrayBuffer>(file: File) {
    return new Promise<T>((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = (evt) => {
            if (!evt.target || !evt.target.result) {
                reject()
                return
            }
            resolve(evt.target.result as T)
        }
        reader.onerror = (evt) => {
            reject()
            console.log(evt)
        }
    })
}