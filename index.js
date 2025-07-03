/*
  1. В задании дается множество (в виде неупорядоченный массива), которое нужно сериализовать и десериализовать.
  Поскольку массив неупорядочен, в результате десериализации не обязательно сохранять порядок исходного массива.
  Сразу приходит на ум решение с подсчетом всех чисел в массиве и сериализация в строку в виде число+количесто, но
  пограничный случай с уникальными элементами не сработает. 

  2. Каждый ASCII символ в строке js занимает n бит.
  Простая сериализации переводит каждую цифру каждого элемента массива в char представление, все они находятся в диапазоне ASCII, т.е
  каждый из них займет также n бит.
  Например [1, 53, 52] после простой сериализации будет выглядеть как '1,53,52' (разделитель здесь запятая, но может быть любым или отсутсвовать).
  Без учета разделителя займет в памяти 5*n бит.

  3. В таблице ASCII 128 первых символов гарантиованно неизменяемы. Ими я могу закодировать, например 127 первых чисел (т.к 0 не входит в диапазон).
  Таким образом, например, числа от [ 1 до 127 ] можно представить в виде ASCII символов.

  4. В массиве содержатся однозначные, двузначные и трехзначные числа, занимающие при простой сериализации n, n*2 и n*3 бит соответственно.
  Используя сопоставление числа и ASCII символа можно сократить n*2 и n*3 битные представления чисел до n битных.
  Однако однозначные числа, т.е n-битные сократить не удастся, выдаст те же n бит.
  Аналогично если использовать систему счисления с большим основанием, однозначные числа останутся такими же.
  И, если исходный массив состоит исключительно из однозначных чисел, то уменьшения размера строки не произойдет.
  А значит нужно представить несколько однозначных числел в виде дву- или трех- значных.

  6. Исходный диапазон от [1, 300], число 0 в него не входит и одновременно является ASCII-символом. Используем его в качестве
  спецсимвола. Кодированные однозначные числа, объединенные в дву- или трех-значные необходимо будет однозначно распознать при десериализации
  и разбить на исходные. Чтобы отличить их от обычных чисел, в сериализованной строке сначала будут идти все кодированные однозначные символы,
  а далее отделенные от них спецсимволом дву- и трех- значные.
  Но диапазона [1, 127] недостаточно чтобы закодировать 300 чисел, для этого разобъем входной диапазон на 3 части по 100 чисел 
  закодируем соответствующими в ASCII таблице(например, предварительно вычтя какое-то число, чтобы попасть в интервал) и также отделим спецсимволом.
  По итогу получим: {однозначные числа}0{числа от [10-127]}0{числа от [128-254]}0{числа от [255-300]}

*/

function serializeArray(arr) {
  let result = new Array(4);

  const arrMap = Array.from({ length: 301 }, (_, i) => 0);
  arr.forEach((el) => arrMap[el]++);

  // спецсимвол, чтобы разделить сериализованную строку на группы
  const reservedSymbol = String.fromCharCode(0);

  let i = 300;
  // Кодируем числа в диапазоне от 256 до 300 со смещением;
  let fourthIntervalResultString = "";
  while (i >= 255) {
    while (arrMap[i]) {
      fourthIntervalResultString += String.fromCharCode(i - 254);
      arrMap[i]--;
    }
    i--;
  }

  result[3] = fourthIntervalResultString;

  // Кодируем числа в диапазоне от 128 до 254 со смещением;
  let thirdIntervalResultString = "";
  while (i >= 128) {
    while (arrMap[i]) {
      thirdIntervalResultString += String.fromCharCode(i - 127);
      arrMap[i]--;
    }
    i--;
  }

  result[2] = thirdIntervalResultString;

  // Кодируем числа в диапазоне от 10 до 127;
  let secondIntervalResultString = "";
  while (i >= 10) {
    while (arrMap[i]) {
      secondIntervalResultString += String.fromCharCode(i);
      arrMap[i]--;
    }
    i--;
  }

  result[1] = secondIntervalResultString;

  // Делаем пары из однозначных чисел и кодируем в виде ASCII символа
  let oneNumberElementsString = "";

  while (i >= 1) {
    while (arrMap[i]) {
      oneNumberElementsString += i;
      arrMap[i]--;
    }
    i--;
  }

  const pairedNumbers = oneNumberElementsString.match(/.{1,2}/g) || [];
  let pairedNumbersResultString = "";
  pairedNumbers.forEach((el) => {
    pairedNumbersResultString += String.fromCharCode(el);
  });

  result[0] = pairedNumbersResultString;
  while (!result[result.length - 1]) {
    result.pop();
  }

  return result.join(reservedSymbol);
}

function deserializeString(str) {
  const result = [];

  const reservedSymbol = String.fromCharCode(0);
  const groupedStr = str.split(reservedSymbol);

  // работаем с первой группой, вытаскиваем однозначные числа из пар
  let pairedGroup = groupedStr[0];
  if (pairedGroup) {
    for (let i = 0; i < pairedGroup.length; i++) {
      let decodedPair = pairedGroup[i].charCodeAt(0);
      result.push(decodedPair % 10);
      decodedPair > 10 && result.push(Math.floor(decodedPair / 10));
    }
  }

  // вторая группа, вытаскиваем от 10-127
  let secondGroup = groupedStr[1];
  if (secondGroup) {
    for (let i = 0; i < secondGroup.length; i++) {
      result.push(secondGroup[i].charCodeAt(0));
    }
  }

  // третья группа, вытаскиваем от 128-254
  let thirdGroup = groupedStr[2];
  if (thirdGroup) {
    for (let i = 0; i < thirdGroup.length; i++) {
      result.push(thirdGroup[i].charCodeAt(0) + 127);
    }
  }

  // четвертая группа, вытаскиваем от 255-300
  let fourthGroup = groupedStr[3];
  if (fourthGroup) {
    for (let i = 0; i < fourthGroup.length; i++) {
      result.push(fourthGroup[i].charCodeAt(0) + 254);
    }
  }

  return result;
}

module.exports = { serializeArray, deserializeString };
