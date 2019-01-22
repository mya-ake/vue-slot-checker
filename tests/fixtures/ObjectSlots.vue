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
      required: true,
    },
    header: {
      required: true,
    },
  },
};
</script>
