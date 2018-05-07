

const convertDuration = (val) => {
    let ms = val;
    let min = Math.floor((ms / 1000 / 60) << 0);
    let sec = Math.floor((ms / 1000) % 60);
    
    if ( sec < 10) {
        sec = '0'+sec
    }
    return `${min}:${sec}`
}

export {convertDuration}; 