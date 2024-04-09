<template>
    <div class="circle" style="--clr:#0cfc43;">
        <div class="dots sec_dot"></div>
        <svg>
            <circle cx="70" cy="70" r="70"></circle>
            <circle cx="70" cy="70" r="70" id="ss"></circle>
        </svg>
        <div id="seconds">00</div>
    </div>
</template>

<style scoped>
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #2f363e;
  font-family: 'Poppins', sans-serif;
}

#time{
  display: flex;
  gap: 30px;
}

.circle{
  position: relative;
  width: 150px;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.circle svg{
  position: relative;
  width: 150px;
  height: 150px;
  transform: rotate(270deg);
}

.circle svg circle{
  width: 100%;
  height: 100%;
  fill: transparent;
  stroke-width: 8;
  stroke: #282828;
  stroke-linecap: round;
  transform: translate(5px, 5px);
}
.circle svg circle:nth-child(2) {
  stroke: var(--clr);
  stroke-dasharray: 440;
  stroke-dashoffset: 440;
}

#time div{
  position: absolute;
  text-align: center;
  font-weight: 500;
  color: #fff;
  font-size: 1.5em;
}

#time div span{
  position: absolute;
  font-size: 0.35em;
  font-weight: 300;
  transform: translateX(-50%) translateY(-10px);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

#time .dots{
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  justify-content:center;
  align-items: flex-start;
  z-index: 1000;
}

#time .dots::before{
  content: '';
  position: absolute;
  top:-3px;
  width: 15px;
  height: 15px;
  background-color: var(--clr);
  border-radius: 50%;
  box-shadow: 0 0 20px var(--clr), 0 0 60px var(--clr);
}

.newYear{
  display: none;
  font-size: 8em;
  font-weight: 500;
  color: #fff;
  text-align: center;
  line-height: 0.6em;
}

.newYear span{
  font-size: 0.5em;
  font-weight: 300;
}
</style>