const logger = (k, v) => {
    console.log(`%c${k || 'no key'}`, "color:red;font-size:16px");
    console.log(v || 'no value');
}

export default logger