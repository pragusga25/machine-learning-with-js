const outputs = [];
const k = 3;

function onScoreUpdate(dropPosition, bounciness, size, bucketLabel) {
  outputs.push([dropPosition, bounciness, size, bucketLabel]);
}

function runAnalysis() {
  const testSize = 10;
  const [training, test] = splitDataset(outputs, testSize);

  const accuracy = _.chain(test)
    .filter((testPoint) => knn(training, testPoint[0]) === testPoint[3])
    .size()
    .divide(testSize)
    .value();

  console.log(`Accuracy: ${accuracy}`);
}

function knn(dataset, point) {
  return _.chain(dataset)
    .map((row) => [distance(row[0], point), row[3]])
    .sortBy((row) => row[0])
    .slice(0, k)
    .countBy((row) => row[1])
    .toPairs()
    .sortBy((row) => row[1])
    .last()
    .first()
    .parseInt()
    .value();
}

function distance(x, y) {
  return Math.abs(x - y);
}

function splitDataset(dataset, testCount) {
  const shuffled = _.shuffle(dataset);

  const test = _.slice(shuffled, 0, testCount);
  const training = _.slice(shuffled, testCount);

  return [training, test];
}
