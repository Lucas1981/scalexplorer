<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-4">
      <a class="navbar-brand" href="#">scaleXplorer</a>
    </nav>
    <div class="container">
      <p>
        Select a scale:
        <select
          v-model="scale"
        >
          <option
            v-for="key of scales"
            :key="key"
            :value="key"
          >
            {{ key }}
          </option>
        </select>
      </p>
      <table class="table">
        <tr
          v-if="output !== null"
          v-for="record of output"
          :key="record.index"
        >
          <td>
            Scale {{ record.scale }}
          </td>
          <td>
            is mode {{ record.index + 1 }} of
          </td>
          <td>
            {{ record.original }}
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Keys from './Keys.js';

const keys = new Keys();

export default {
  name: 'app',
  data: () => ({
    scale: null
  }),
  computed: {
    scales() {
      return keys.getMajorKeys().map(scale => scale[0]);
    },
    output() {
      if (this.scale === null) return null;
      let scales = []
      for (let i = 0; i < keys.getSteps().length; i++) {
        const scale = keys.constructMode(this.scale, i);
        const original = keys.scaleAsOutput(keys.findFirstMode(scale, i));
        scales.push({ index: i, scale: keys.scaleAsOutput(scale), original });
        console.log(`Scale ${scale} is mode ${i + 1} of ${original}`);
      }

      return scales;
    }
  },
  beforeMount() {
    console.log('Setting scale');
    this.scale = this.scales[7];
  }
}
</script>
