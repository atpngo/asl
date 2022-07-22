/*
    Default Values:
    Learning Rate: 0.1
    Epochs: 10
    Batch Size: 32
*/
let model;
let trainingStats;

const setMessage = (message) =>
{
    document.getElementById("message").innerText = message;
}

const insertButton = (val, callback) =>
{
    const newButton = document.createElement("button");
    newButton.innerText = val;
    newButton.onclick = callback;
    const placeHolderDiv = document.getElementById("placeholder");
    document.body.insertBefore(newButton, placeHolderDiv);
}

const insertRow = (cell1, cell2) =>
{
    let table = document.getElementById("stats");
    let row = table.insertRow(table.length);
    let a = row.insertCell(0);
    let b = row.insertCell(1);
    a.innerHTML = cell1;
    b.innerHTML = cell2;
}

const whileTraining = (epoch, loss) =>
{
    let tmp = {};
    tmp.epoch = epoch;
    tmp.loss = loss;
    trainingStats.push(tmp);
}

const finishedTraining = () =>
{
    setMessage("Neural Network has finished training.");
    insertRow('Epoch', 'Loss');
    for (const val of trainingStats)
    {
        insertRow(val.epoch, val.loss.loss);
    }
    insertButton("Save Model", () => {
        model.save();
    });
}

const dataLoaded = () =>
{
    console.log('Data Loaded');
    let epochs = parseFloat(document.getElementById('epochs').value);
    let batchSize = parseFloat(document.getElementById('batch').value);
    
    model.normalizeData();
    trainingStats = [];
    model.train({
        epochs: epochs,
        batchSize: batchSize
    }, whileTraining, finishedTraining);

}

const validateInput = () =>
{
    let epochs = parseFloat(document.getElementById('epochs').value);
    let batchSize = parseFloat(document.getElementById('batch').value);
    let learningRate = parseFloat(document.getElementById('learning').value);

    return (epochs && batchSize && learningRate);
}

const createNN = () =>
{
    
    let learningRate = parseFloat(document.getElementById('learning').value);
    if (!validateInput())
    {
        alert('Invalid Input');
        return;
    }
    let options = {
        task: 'classification',
        debug: true,
        learningRate: learningRate
    }
    model = ml5.neuralNetwork(options);
    model.loadData('output.json', dataLoaded);
}


const debug = () =>
{

}