<template>
  <div>
    <header><slot name="header" /></header>
    <div><slot /></div>
  </div>
</template>

<script>
export default {
  slots: {
    default: {
      validator(slot) {
        if (typeof slot === 'undefined') {
          return false;
        }
        return typeof slot[0].text === 'string';
      },
    },
    header: {
      validator(slot) {
        if (typeof slot === 'undefined') {
          return false;
        }
        return slot[0].tag === 'nav';
      },
    },
  },
};
</script>
