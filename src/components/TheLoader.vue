<template>
  <div class="loader">
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
.loader {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
}

.loader > .circle {
  position: relative;
  width: 30px;
  height: 30px;
  margin: 0 auto;
  transform: translate(-1px, -7px);
}

.loader > .circle > div {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4px;
  height: 9px;
  border-radius: 4px;
  background-color: var(--color-accent-rust);
  transform-origin: center 15px;
  animation: spinner 0.8s linear infinite;
}

@keyframes spinner {
  0% { opacity: 1; }
  100% { opacity: 0; }
}

.loader > .circle > div:nth-child(1) { transform: rotate(0deg); animation-delay: -0.7s; }
.loader > .circle > div:nth-child(2) { transform: rotate(45deg); animation-delay: -0.6s; }
.loader > .circle > div:nth-child(3) { transform: rotate(90deg); animation-delay: -0.5s; }
.loader > .circle > div:nth-child(4) { transform: rotate(135deg); animation-delay: -0.4s; }
.loader > .circle > div:nth-child(5) { transform: rotate(180deg); animation-delay: -0.3s; }
.loader > .circle > div:nth-child(6) { transform: rotate(225deg); animation-delay: -0.2s; }
.loader > .circle > div:nth-child(7) { transform: rotate(270deg); animation-delay: -0.1s; }
.loader > .circle > div:nth-child(8) { transform: rotate(315deg); animation-delay: 0s; }
</style>
