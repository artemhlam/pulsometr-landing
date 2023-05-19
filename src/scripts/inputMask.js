const maskInputs = document.querySelectorAll('.masked');
maskInputs.forEach(input => {

  const pattern = input.dataset.pattern;
  input.oninput = () => mask(input, pattern)
})

function mask(input, pattern) {
  const space = ' ';
  const any = '_';

  const maxLength = +pattern.length;
  const value = input.value.replace(/[^\d|+| ]/g, '');

  if(input.value.length >= maxLength) {
    input.value = input.value.slice(0, maxLength);
    return;
  }

  let out = '';

  let patternIndexIncrement = 0;
  for (let i = 0; i < value.length; i++) {
    const valueChar = value[i];
    const patternChar = pattern[i + patternIndexIncrement];

    console.log(valueChar, patternChar)

    if (patternChar === any && valueChar !== space) {
      out += valueChar;
    } else if (valueChar === patternChar) {
      out += valueChar;
    } else if (patternChar !== any && valueChar !== space) {
      out += patternChar + valueChar;
      patternIndexIncrement++
    }
  }

  input.value = '';
  input.value = out;
}