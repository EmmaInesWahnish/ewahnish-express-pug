const processRandoms = async (quantity) => {
    let randomNumber = [];
    let randomNoCeros = {};
    let count = 0;
    let sum = 0;
    const generateArray = async () => {
        for (let i = 0; i < 1000; i++) {
            let myObj = {};
            myObj[`${i + 1}`] = 0;
            randomNumber.push(myObj);
        }
        for (let i = 0; i < quantity; i++) {
            const which_number = Math.floor((Math.random() * 1000) + 1);
            let index = which_number - 1;
            let value = randomNumber[index][`${index + 1}`] + 1;
            randomNumber[index][`${index + 1}`] = value;
        }
        for (let i = 0; i < 1000; i++) {
            if (randomNumber[i][`${i + 1}`] != 0) {
                randomNoCeros[`${i + 1}`] = randomNumber[i][`${i + 1}`];
                count++;
                sum = sum + Number(randomNumber[i][`${i + 1}`]);
            }
        }
        console.log(randomNoCeros);
        console.log("Number : ", count, "Sum : ", sum)
    }
    await generateArray();
    return randomNoCeros
}

module.exports = processRandoms