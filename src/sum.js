function sum(...numbers){
    let sum=0;

    for(let i = 0; i<numbers.length; i++){
        sum+=numbers[i];
    }

    return sum;
}

function avg(...numbers){
    console.log('test log ' + numbers[0]);
    const x = ()=>10;
    return sum(...numbers)/numbers.length;
}



export default avg; 