const outputs = [];
const predictionPoint = 300;
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const bucket = _.chain(outputs)
    .map((row) => [distance(row[0]), row[3]])
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();

  console.log('Your ball will probably fall into ', bucket);
}

function distance(point) {
  return Math.abs(point - predictionPoint);
}

function splitDataset(dataset, testCount) {
  const shuffled = _.shuffle(dataset);

  const testSet = _.slice(shuffled, testCount);
  const trainingset = _.slice(shuffled, testCount);

  return [testSet, trainingset];
}
