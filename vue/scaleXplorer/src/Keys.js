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

export default class Keys {
  constructor() {}

  hasFlats(key) { return key.some(note => note.includes(flat)); }
  hasSharps(key) { return key.some(note => note.includes(sharp)); }
  getMajorKeys() { return majorKeys; }
  getSteps() { return steps; }
  getKeyFromNote(note) { return majorKeys.find(key => key[0] === note); }
  scaleAsOutput(scale) { return scale.join(' '); }

  hasDuplicateKeys(scale) {
    let modifiedScale = scale
      .join('')
      .replace(/#/g, '')
      .replace(/b/, '');

    for (let i = 1; i < modifiedScale.length; i++) {
      if (modifiedScale.charAt(i) === modifiedScale.charAt(i - 1)) {
        return true;
      }
    }

    return false;
  }

  constructMode(key, mode = 0) {
    const sharpScale = [];
    const flatScale = [];
    const majorKeys = this.getKeyFromNote(key)
    let index = this.hasSharps(majorKeys) ? sharps.indexOf(key) : flats.indexOf(key);
    sharpScale.push(key);
    flatScale.push(key);
    for (let i = 0; i < steps.length; i++) {
      index += steps[(i + mode) % steps.length];
      sharpScale.push(sharps[index % sharps.length]);
      flatScale.push(flats[index % flats.length])
    }
    return this.hasDuplicateKeys(sharpScale) ? flatScale : sharpScale;
  }

  findFirstMode(scale, mode) {
    // Walk back to the root note
    const rootIndex = (steps.length - mode) % steps.length;
    return this.constructMode(scale[rootIndex], 0);
  }
}
