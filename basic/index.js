const steps = [2, 2, 1, 2, 2, 2, 1];
const sharps = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const flats = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'];
const fifths = ['Bb', 'F', 'C', 'G', 'D', 'A', 'E', 'B', 'F#', 'G#', 'D#', 'A#', 'E#']
const sharp = '#';
const flat = 'b';
const majorKeys = [
  // [ 'Fb', 'Gb', 'Ab', 'Bbb', 'Cb', 'Db', 'Eb' ],
  [ 'Cb', 'Db', 'Eb', 'Fb', 'Gb', 'Ab', 'Bb' ],
  [ 'Gb', 'Ab', 'Bb', 'Cb', 'Db', 'Eb', 'F' ],
  [ 'Db', 'Eb', 'F', 'Gb', 'Ab', 'Bb', 'C' ],
  [ 'Ab', 'Bb', 'C', 'Db', 'Eb', 'F', 'G' ],
  [ 'Eb', 'F', 'G', 'Ab', 'Bb', 'C', 'D' ],
  [ 'Bb', 'C', 'D', 'Eb', 'F', 'G', 'A' ],
  [ 'F', 'G', 'A', 'Bb', 'C', 'D', 'E' ],
  [ 'C', 'D', 'E', 'F', 'G', 'A','B' ],
  [ 'G', 'A', 'B', 'C', 'D', 'E', 'F#' ],
  [ 'D', 'E', 'F#', 'G', 'A', 'B', 'C#' ],
  [ 'A', 'B', 'C#', 'D', 'E', 'F#', 'G#' ],
  [ 'E', 'F#', 'G#', 'A', 'B', 'C#', 'D#' ],
  [ 'B', 'C#', 'D#', 'E', 'F#', 'G#', 'A#' ],
  [ 'F#', 'G#', 'A#', 'B', 'C#', 'D#', 'E#' ],
  // [ 'C#', 'D#', 'E#', 'F#', 'G#', 'A#', 'B#' ],
  // [ 'G#', 'A#', 'B#', 'C#', 'D#', 'E#', 'F##' ],
  // [ 'D#', 'E#', 'F##', 'G#', 'A#', 'B#', 'C##' ],
  // [ 'A#', 'B#', 'C##', 'D#', 'E#', 'F##', 'G##' ],
  // [ 'E#', 'F##', 'G##', 'A#', 'B#', 'C##', 'D##' ],
  // [ 'B#', 'C##', 'D##', 'E#', 'F##', 'G##', 'A##' ],
];
const hasFlats = key => {
  for (let i = 0; i < key.length; i++) {
    if (key[i].includes(flat)) return true;
  }
  return false;
};

const hasSharps = key => {
  for (let i = 0; i < key.length; i++) {
    if (key[i].includes(sharp)) return true;
  }
  return false;
};

const getKeyFromNote = note => {
  let key = null;
  for(let i = 0; i < majorKeys.length; i++) {
    if (majorKeys[i][0] === note) return majorKeys[i];
  }
  throw new Error(`Couldn't find key ${note}`);
};

const hasDuplicateKeys = scale => {
  let modifiedScale = scale
    .join('')
    .replace(/#/g, '')
    .replace(/b/, '');

  // console.log(modifiedScale);

  for (let i = 1; i < modifiedScale.length; i++) {
    if (modifiedScale.charAt(i) === modifiedScale.charAt(i - 1)) {
      return true;
    }
  }

  return false;
};

const constructMode = (key, mode = 0) => {
  const sharpScale = [];
  const flatScale = [];
  const majorKeys = getKeyFromNote(key)
  let index = hasSharps(majorKeys) ? sharps.indexOf(key) : flats.indexOf(key);
  sharpScale.push(key);
  flatScale.push(key);
  for (let i = 0; i < steps.length; i++) {
    index += steps[(i + mode) % steps.length];
    sharpScale.push(sharps[index % sharps.length]);
    flatScale.push(flats[index % flats.length])
  }
  return hasDuplicateKeys(sharpScale) ? flatScale : sharpScale;
};

const findFirstMode = (scale, mode) => {
  // Walk back to the root note
  const rootIndex = (steps.length - mode) % steps.length
  return constructMode(scale[rootIndex], 0);
}

const scaleAsOutput = scale => scale.join(' ');

for (let i = 0; i < steps.length; i++) {
  const scale = constructMode('E', i);
  const original = findFirstMode(scale, i);
  console.log(`Scale ${scaleAsOutput(scale)} is mode ${i + 1} of ${scaleAsOutput(original)}`);
}
