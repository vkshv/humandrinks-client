<template>
  <div class="init-loader">
    <div class="circle"></div>
  </div>
</template>

<style scoped>
.init-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: var(--color-accent-rust);
}

.circle {
  width: 50px;
  padding: 8px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: #ffffff;
  --_m: 
    conic-gradient(#0000 10%,#000),
    linear-gradient(#000 0 0) content-box;
  -webkit-mask: var(--_m);
          mask: var(--_m);
  -webkit-mask-composite: source-out;
          mask-composite: subtract;
  animation: rotate 1s infinite linear;
}

@keyframes rotate {to{transform: rotate(1turn)}}
</style>
