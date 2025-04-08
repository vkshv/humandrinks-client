<template>
  <div class="init-loader">
    <div class="circle">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
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

.init-loader > .circle {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  transform: translate(-1px, -7px);
}

.init-loader > .circle > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 9px;
  border-radius: 4px;
  background-color: var(--color-gray-white);
  transform-origin: center 15px;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.init-loader > .circle > div:nth-child(1) { transform: rotate(0deg); animation-delay: -0.7s; }
.init-loader > .circle > div:nth-child(2) { transform: rotate(45deg); animation-delay: -0.6s; }
.init-loader > .circle > div:nth-child(3) { transform: rotate(90deg); animation-delay: -0.5s; }
.init-loader > .circle > div:nth-child(4) { transform: rotate(135deg); animation-delay: -0.4s; }
.init-loader > .circle > div:nth-child(5) { transform: rotate(180deg); animation-delay: -0.3s; }
.init-loader > .circle > div:nth-child(6) { transform: rotate(225deg); animation-delay: -0.2s; }
.init-loader > .circle > div:nth-child(7) { transform: rotate(270deg); animation-delay: -0.1s; }
.init-loader > .circle > div:nth-child(8) { transform: rotate(315deg); animation-delay: 0s; }

/* .circle {
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

@keyframes rotate {to{transform: rotate(1turn)}} */
</style>
